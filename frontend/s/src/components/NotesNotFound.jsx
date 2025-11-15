import React from "react";
import { FileSearch } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
      {/* Icon */}
      <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-3xl mb-6 shadow-lg">
        <FileSearch className="size-12 text-neutral-400" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-white mb-3">
        No Notes Found
      </h1>

      {/* Subtitle */}
      <p className="text-neutral-400 max-w-md mb-8">
        Looks like you haven’t created any notes yet.  
        Start organizing your thoughts by creating a new one.
      </p>

      {/* Button */}
      <Link
        to="/create"
        className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-3 rounded-3xl transition-all duration-300"
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
