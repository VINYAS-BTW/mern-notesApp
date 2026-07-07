import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = "claude-sonnet-4-6";

//  Helper
async function ask(systemPrompt, userContent, maxTokens = 1024) {
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userContent }],
  });
  return msg.content[0].text.trim();
}

//  AI Features 

export async function summarizeNote(content) {
  return ask(
    "You are a concise note summarizer. Produce a 2–4 sentence plain-text summary. No markdown, no preamble.",
    `Summarize this note:\n\n${content}`
  );
}

export async function autoTagNote(content) {
  const raw = await ask(
    `You are a tagging assistant. Return ONLY a JSON array of 3–6 lowercase tag strings (no explanation, no markdown).
     Example: ["javascript","react","hooks"]`,
    `Generate tags for this note:\n\n${content}`
  );
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return [];
  }
}

export async function fixGrammar(content) {
  return ask(
    "You are a grammar and clarity editor. Fix grammar, spelling, and awkward phrasing. Return ONLY the corrected text, preserving all formatting.",
    content,
    2048
  );
}

export async function expandNote(content) {
  return ask(
    "You are a writing assistant. Expand this note with more detail, examples, and structure. Keep the same topic and tone.",
    content,
    2048
  );
}

export async function askQuestion(content, question) {
  return ask(
    "You are a helpful assistant answering questions about a specific note. Be concise and accurate. Only use information from the note provided.",
    `Note:\n${content}\n\nQuestion: ${question}`
  );
}

export async function generateTitle(content) {
  return ask(
    "Generate a short, catchy title (max 8 words) for this note. Return ONLY the title, no quotes, no punctuation at the end.",
    content,
    50
  );
}

export async function actionItems(content) {
  const raw = await ask(
    `Extract all action items / todos from this note. Return ONLY a JSON array of strings. Example: ["Buy milk","Call John"]`,
    content
  );
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return [];
  }
}