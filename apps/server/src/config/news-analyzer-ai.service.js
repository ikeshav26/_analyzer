import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";

dotenv.config();

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const SYSTEM_PROMPT = `
You are a strict news verification AI.

Rules:
- Never guess.
- If uncertain, say UNVERIFIED.
- Do not invent political or recent events.
- Prefer caution over confidence.

Output format:
VERDICT: TRUE / FALSE / UNVERIFIED EXPLANATION: one short neutral sentence
`;

export async function analyzeNewsFromAi(prompt) {
  try {
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return {
        success: false,
        error: "Invalid or empty prompt",
      };
    }

    const response = await client.chat.send({
      model: "arcee-ai/trinity-large-preview:free",
      temperature: 0.2, 
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt.trim(),
        },
      ],
    });


    const result =
      response?.choices?.[0]?.message?.content ||
      "UNVERIFIED. No response generated.";

    return {
      success: true,
      result: result.trim(),
    };
  } catch (err) {
    console.error("AI error:", err?.message || err);

    return {
      success: false,
      error: "AI service unavailable",
    };
  }
}

export default analyzeNewsFromAi;
