import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="w-full bg-neutral-900 border-b border-neutral-800 text-white">
      <nav className="flex justify-between items-center max-w-6xl mx-auto py-4 px-6">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-wide">
          V<span className="text-lime-400">!</span>notes
        </Link>

        {/* Create Button */}
        <Link
          to="/create"
          className="bg-green-500 hover:bg-green-600 text-black font-medium py-2 px-6 rounded-2xl transition-all duration-300"
        >
          Create Note
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
