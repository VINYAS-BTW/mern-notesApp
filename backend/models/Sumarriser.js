import mongoose from "mongoose";

const summariserSchema = new mongoose.Schema(
  {
    noteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },

    originalContent: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    generatedBy: {
      type: String,
      default: "Claude Sonnet 4",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Summariser", summariserSchema);