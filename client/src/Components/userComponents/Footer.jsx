import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex  justify-between items-center">
        
        <div>
          <Link to="/" className="text-xl font-bold font-serif text-white tracking-tight">
        ink<span className="text-green-400 ">.</span>blog
      </Link>
          <p className="text-gray-400 mt-1 text-xs">
            Write. Publish. Inspire.
          </p>
        </div>

         <div className="flex-row justify-center gap-6 mt-4">
          <div className="flex gap-2">
            <a
            href="mailto:routdibyajyoti278@gmail.com"
            target="_blank"
            className="text-[#0A6B68] hover:underline"
          >
            <FaEnvelope size={18} />
          </a>

          <a href="https://www.linkedin.com/in/dibyajyoti--rout/"
             target="_blank"
             rel="noopener noreferrer"
             className="text-[#0A6B68] hover:underline">
            <FaLinkedin size={18} />
          </a>
          </div>
          <p>Contact Us</p>
          
        </div>
        
      </div>

      <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-400">
        © {new Date().getFullYear()} | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;