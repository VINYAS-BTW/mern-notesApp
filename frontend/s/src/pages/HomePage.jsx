import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitUi from "../components/RateLimitUi";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import api from "../../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);

        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("error:", error);

        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          console.error("Failed to import notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-800 to-neutral-900">
      <Navbar />

      {isRateLimited && <RateLimitUi />}

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        )}
  {notes.length===0 && !isRateLimited && <NotesNotFound></NotesNotFound>}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
