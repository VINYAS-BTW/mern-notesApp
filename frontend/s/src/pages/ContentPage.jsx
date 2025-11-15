import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import api from "../../lib/axios";

const ContentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Load note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  //save
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Both fields are required");
      return;
    }

    try {
      await api.put(`/notes/${id}`, {
        title,
        content,
      });
      toast.success("Note updated!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    }
  };

  // del note
  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  if (loading)
    return (
      <div className="text-center text-white py-10">Loading note...</div>
    );

  return (
    <div className="min-h-screen bg-neutral-900 w-full px-12 py-10 text-white">

      {/* top row */}
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/"
          className="flex gap-2 items-center text-white hover:text-gray-300"
        >
          <ArrowLeft className="size-5" /> Back to Notes
        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-5 py-2 rounded-3xl bg-red-900 hover:bg-red-700 border border-red-600 text-red-200 transition-all duration-300"
        >
          <Trash2 className="size-4" />
          Delete Note
        </button>
      </div>

      {/* editing the  frm */}
      <div className="max-w-2xl w-full mx-auto">
        <form onSubmit={handleUpdate} className="flex flex-col gap-6 w-full">
          
          {/* title */}
          <div>
            <label className="block mb-1 text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              placeholder="Note title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3 rounded-3xl bg-black/40 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>

          {/* ccontent */}
          <div>
            <label className="block mb-1 text-gray-300">Content</label>
            <textarea
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              className="w-full px-5 py-3 rounded-3xl bg-black/40 border border-neutral-800 text-white placeholder-neutral-500 resize-y focus:outline-none"
            ></textarea>
          </div>

          {/* save Btn */}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-black font-semibold rounded-3xl py-3 px-6 w-fit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContentPage;
