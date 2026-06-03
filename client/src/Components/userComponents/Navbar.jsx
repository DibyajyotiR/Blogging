import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 px-6 md:px-10 lg:px-20 py-3.5 flex justify-between items-center sticky top-0 z-50 shadow-md shadow-green-500/20">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold font-serif text-white tracking-tight">
        ink<span className="text-green-400 ">.</span>blog
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            {/* Username pill */}
            <span className="hidden md:flex items-center gap-2 text-sm text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full">
              <span className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
              {user?.name}
            </span>

            {/* New post */}
            <Link
              to="/create-post"
              className={`text-sm font-medium px-4 py-2 rounded-lg transition active:scale-95 cursor-pointer ${
                location.pathname === "/create-post"
                  ? "bg-green-800 text-white"
                  : "bg-green-700 hover:bg-green-800 text-white"
              }`}
            >
              + New Post
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-lg transition cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-lg transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-lg transition"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;