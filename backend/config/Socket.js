// Track active users per note room: { noteId -> Map<socketId, {userId, name, color, cursor}> }
const rooms = new Map();

const COLORS = [
  "#6366f1", "#ec4899", "#f59e0b", "#10b981",
  "#3b82f6", "#8b5cf6", "#ef4444", "#14b8a6",
];

let colorIndex = 0;
const assignColor = () => COLORS[colorIndex++ % COLORS.length];

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`[Socket] Client connected: ${socket.id}`);

    //  Join a note room 
    socket.on("note:join", ({ noteId, userId, userName }) => {
      socket.join(noteId);

      if (!rooms.has(noteId)) rooms.set(noteId, new Map());
      const room = rooms.get(noteId);

      const userInfo = { userId, userName, color: assignColor(), socketId: socket.id };
      room.set(socket.id, userInfo);

      // Broadcast updated presence to everyone in room
      io.to(noteId).emit("note:presence", Array.from(room.values()));

      socket.data.noteId = noteId;
      console.log(`[Socket] ${userName} joined note room: ${noteId}`);
    });

    //  Leave a note room 
    socket.on("note:leave", ({ noteId }) => {
      socket.leave(noteId);
      cleanupRoom(io, socket, noteId);
    });

    //  Real-time content change (delta only) 
    socket.on("note:change", ({ noteId, delta, userId }) => {
      // Broadcast to everyone in the room EXCEPT the sender
      socket.to(noteId).emit("note:change", { delta, userId, timestamp: Date.now() });
    });

    //  Cursor position 
    socket.on("note:cursor", ({ noteId, cursor, userId }) => {
      socket.to(noteId).emit("note:cursor", { cursor, userId, socketId: socket.id });
    });

    //  Typing indicator 
    socket.on("note:typing", ({ noteId, userId, userName, isTyping }) => {
      socket.to(noteId).emit("note:typing", { userId, userName, isTyping });
    });

    // Note saved (triggers refresh for others)
    socket.on("note:saved", ({ noteId, note }) => {
      socket.to(noteId).emit("note:saved", { note, savedAt: Date.now() });
    });

    // Cleanup on disconnect
    socket.on("disconnect", () => {
      const noteId = socket.data.noteId;
      if (noteId) cleanupRoom(io, socket, noteId);
      console.log(`[Socket] Client disconnected: ${socket.id}`);
    });
  });
};

function cleanupRoom(io, socket, noteId) {
  if (!rooms.has(noteId)) return;
  const room = rooms.get(noteId);
  room.delete(socket.id);
  if (room.size === 0) {
    rooms.delete(noteId);
  } else {
    io.to(noteId).emit("note:presence", Array.from(room.values()));
  }
}