import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");

    axios
      .post("https://blogg-qqfa.onrender.com/api/auth/register", { name, email, password })
      .then((res) => {
        login(res.data.user, res.data.token);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            ink<span className="text-green-600">.</span>blog
          </h1>
          <p className="text-sm text-slate-500 mt-1">Create your account and start writing.</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-slate-800">Create Account</h2>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              <span>⚠️</span> <span>{error}</span>
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            {/* password strength bar */}
            <div className="flex gap-1 mt-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    password.length === 0
                      ? "bg-stone-200"
                      : password.length < 6
                      ? level === 1 ? "bg-red-400" : "bg-stone-200"
                      : password.length < 10
                      ? level <= 2 ? "bg-amber-400" : "bg-stone-200"
                      : "bg-green-500"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-300">
              {password.length === 0
                ? ""
                : password.length < 6
                ? "Weak password"
                : password.length < 10
                ? "Good password"
                : "Strong password ✓"}
            </p>
          </div>

          {/* Submit */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 disabled:bg-green-300 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-3 rounded-xl transition active:scale-95 cursor-pointer flex items-center justify-center gap-2 mt-1"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating account…
              </>
            ) : (
              "Create Account →"
            )}
          </button>

          {/* Link to login */}
          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;