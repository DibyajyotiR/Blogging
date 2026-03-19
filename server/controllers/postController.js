const Post = require('../models/post')


const createPost = (req, res) => {
    const data = new Post(req.body)

    data.save()
        .then(() => res.status(201).json({ message: 'Post created successfully', post: data }))
        .catch(err => res.status(400).json({ error: err.message }));
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json({ message: 'All Posts found', posts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getPostById = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id);
        res.json({ message: 'Post found', post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updatePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post updated successfully', post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const deletePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully', post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost }
