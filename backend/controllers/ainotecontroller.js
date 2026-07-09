import {
  summarizeNote,
  autoTagNote,
  fixGrammar,
  expandNote,
  askQuestion,
  generateTitle,
  actionItems,
} from "../ai/ainote.js";

// Summarize
export const summarize = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const summary = await summarizeNote(content);

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Summarize Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to summarize note",
    });
  }
};

// Auto Tags
export const generateTags = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const tags = await autoTagNote(content);

    res.status(200).json({
      success: true,
      tags,
    });
  } catch (error) {
    console.error("Tag Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate tags",
    });
  }
};

// Grammar Fix
export const grammarFix = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const corrected = await fixGrammar(content);

    res.status(200).json({
      success: true,
      corrected,
    });
  } catch (error) {
    console.error("Grammar Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fix grammar",
    });
  }
};

// Expand Note
export const expand = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const expanded = await expandNote(content);

    res.status(200).json({
      success: true,
      expanded,
    });
  } catch (error) {
    console.error("Expand Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to expand note",
    });
  }
};

// Ask Question
export const askAI = async (req, res) => {
  try {
    const { content, question } = req.body;

    if (!content || !question) {
      return res.status(400).json({
        message: "Content and question are required",
      });
    }

    const answer = await askQuestion(content, question);

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Question Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to answer question",
    });
  }
};

// Generate Title
export const titleGenerator = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const title = await generateTitle(content);

    res.status(200).json({
      success: true,
      title,
    });
  } catch (error) {
    console.error("Title Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate title",
    });
  }
};

// Action Items
export const extractActionItems = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const actions = await actionItems(content);

    res.status(200).json({
      success: true,
      actions,
    });
  } catch (error) {
    console.error("Action Items Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to extract action items",
    });
  }
};