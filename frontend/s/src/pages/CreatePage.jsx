import { ArrowLeftFromLineIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [cont, setCont] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !cont.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/notes", {
        title,
        content: cont,
      });

      toast.success("Note created!");
      navigate("/");

    } catch (error) {
      

      if (error.response && error.response.status === 429) {
        toast.error("Too many requests — slow down ",{
          duration:4000,
          
        });
        
      }else{
toast.error("Failed to create note");
        }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 w-full px-12 py-10 text-white">

      {/* Back Button */}
      <button className="px-3 py-3 flex items-center gap-2 mb-6 text-white cursor-pointer rounded-2xl bg-neutral-700 hover:bg-neutral-600 transition-all duration-300 w-fit">
        <ArrowLeftFromLineIcon className="size-5" />
        <Link to={"/"}>Back to Notes</Link>
      </button>

      {/* Centered Wrapper */}
      <div className="max-w-2xl w-full mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">Create New Note</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          
          {/* Title */}
          <div>
            <label className="block mb-1 text-gray-300">Title</label>
            <input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3 rounded-3xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 text-gray-300">Content</label>
            <textarea
              placeholder="Write your note here..."
              value={cont}
              onChange={(e) => setCont(e.target.value)}
              rows="6"
              className="w-full px-5 py-3 rounded-3xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 resize-y focus:outline-none"
            ></textarea>
          </div>

          {/* Create Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-black font-semibold rounded-3xl py-3 px-6 w-fit disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
