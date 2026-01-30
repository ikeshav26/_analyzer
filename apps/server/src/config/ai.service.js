import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const NEWS_SYSTEM_PROMPT = `
You are a strict news verification AI.

Rules:
- Never guess.
- If uncertain, say UNVERIFIED.
- Do not invent political or recent events.
- Prefer caution over confidence.

Output format:
VERDICT: TRUE / FALSE / UNVERIFIED EXPLANATION: one short neutral sentence
`;




export async function analyzeNews(prompt) {
  try {
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return { success: false, error: "Invalid or empty prompt" };
    }

    const response = await client.chat.completions.create({
      model: "arcee-ai/trinity-large-preview:free",
      temperature: 0.2,
      messages: [
        { role: "system", content: NEWS_SYSTEM_PROMPT },
        { role: "user", content: prompt.trim() },
      ],
    });

    const result =
      response?.choices?.[0]?.message?.content ||
      "UNVERIFIED. No response generated.";

    return { success: true, result: result.trim() };
  } catch (err) {
    console.error("News AI error:", err?.message || err);
    return { success: false, error: "AI service unavailable" };
  }
}



export async function analyzeImage(base64OrUrl) {
  try {
    if (!base64OrUrl || typeof base64OrUrl !== "string") {
      return { success: false, error: "Invalid or empty image input" };
    }

    let imageUrl = base64OrUrl;
    if (!base64OrUrl.startsWith("http") && !base64OrUrl.startsWith("data:")) {
      imageUrl = `data:image/jpeg;base64,${base64OrUrl}`;
    }


    const response = await client.chat.completions.create({
      model: "allenai/molmo-2-8b:free",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image. Is it AI-generated or Real? Return ONLY a JSON object with this key structure: {\"ai_generated\": boolean, \"confidence\": number, \"reasoning\": string}. Do not add markdown blocks."
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
    });

    const raw = response?.choices?.[0]?.message?.content || "{}";
    let result = {};
    try {
        const jsonStart = raw.indexOf('{');
        const jsonEnd = raw.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
            result = JSON.parse(raw.substring(jsonStart, jsonEnd + 1));
        } else {
             throw new Error("No JSON found");
        }
    } catch (e) {
        result = { 
            ai_generated: raw.toLowerCase().includes("ai") || raw.toLowerCase().includes("generated"),
            confidence: 0.8,
            reasoning: raw
        };
    }

    return {
      success: true,
      result: {
        ai_generated: result.ai_generated,
        confidence: result.confidence || 0,
        raw_scores: result
      },
    };
  } catch (err) {
    console.error("Image AI error:", err?.message || err);
    return { success: false, error: "AI service unavailable: " + err.message };
  }
}


export default { analyzeNews, analyzeImage };