import React from "react";
import { Link } from "react-router-dom"; 
import { PenLine, Trash2Icon } from "lucide-react";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note,setNotes }) => {

  const handledelete=async (e,id)=>{
    e.preventDefault();
    if(!window.confirm("are u sure")) return;
    try{
      await api.delete(`/notes/${id}`)
      setNotes((prev)=> prev.filter(note => note._id !== id))
      toast.success("note deleted ")
    }
    catch (error){
      toast.error("couldnt delete")
    }
  }
  return (
    <Link
      to={`/login/${note._id}`}
      className="block bg-neutral-900 border border-neutral-800 hover:border-lime-400 rounded-2xl p-5 transition-all duration-200 shadow-md hover:shadow-lime-400/10"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-lime-300">{note.title}</h3>
        <p className="text-neutral-300 text-sm line-clamp-3">{note.content}</p>
        <div className="flex justify-between items-center mt-3 text-neutral-500 text-xs">
          <span>{new Date(note.createdAt).toLocaleDateString()}</span>
          <div className="flex items-center gap-3">
            <button
              className="hover:text-lime-400 transition-colors"
              title="Edit"
            >
              <PenLine className="w-4 h-4" />
            </button>
            <button
              className="hover:text-red-400 transition-colors"
              title="Delete"
            >
              <Trash2Icon className="w-4 h-4" onClick={(e)=>handledelete(e,note._id)} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
