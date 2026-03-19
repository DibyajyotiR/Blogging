import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="px-4 md:px-10 lg:px-20 py-3 bg-slate-600 text-white text-sm md:text-lg flex justify-between items-center">
      <Link to="/">
        <button className="px-3 py-1 md:px-4 md:py-2 lg:px-5 bg-green-500 rounded-lg cursor-pointer active:scale-95 transition duration-200 active:bg-green-600 hover:bg-green-400">
          Home
        </button>
      </Link>
      <Link to="/create-post">
        <button className="px-3 py-1 md:px-4 md:py-2 lg:px-5 bg-green-500 rounded-lg cursor-pointer active:scale-95 transition duration-200 active:bg-green-600 hover:bg-green-400">
          Create Post
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
