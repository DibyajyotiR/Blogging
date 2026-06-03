const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ── Register ──────────────────────────────────────────────────────────────
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashed
        });

        await user.save();

        console.log("JWT_SECRET =", process.env.JWT_SECRET);

        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error("REGISTER ERROR:", err);

        return res.status(500).json({
            success: false,
            message: err.message,
            error: err
        });
    }
};

// ── Login ─────────────────────────────────────────────────────────────────
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' })
        }

        const token = jwt.sign(
            { userId: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({
            success: true,
            message: 'Login successful.',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        })

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error. Please try again.' })
    }
}

// ── Get current user (protected) ──────────────────────────────────────────
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password')
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' })
        }
        res.json({ success: true, user })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error.' })
    }
}

module.exports = { register, login, getMe }