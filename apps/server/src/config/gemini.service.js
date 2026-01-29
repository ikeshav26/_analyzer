import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GEMINI_KEY});


const analyzeNewsFromAi=async(prompt)=>{
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: `You are an AI News Verifier. Your purpose is to analyze news headlines or claims provided by users and determine their authenticity.
  
  Follow these guidelines:
  1. If the news is TRUE: Confirm it and provide brief context or details.
  2. If the news is FAKE or False: Explicitly state it is false and explain why, providing correct information if available.
  3. If the news is UNVERIFIED or NON-EXISTENT: State "There is no credible reporting to support this claim" or similar.
  4. If the input is not a news claim: Politely ask for a news headline to verify.
  
  Always answer in clear, plain text. Do not use markdown if possible, just simple paragraphs.`,
    },
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt }
        ]
      }
    ]
  });
  return response.text();
}


export default analyzeNewsFromAi;
