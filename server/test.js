import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

async function run() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

    const result = await model.generateContent("Say hello from Gemini!");
    console.log("Gemini says:", result.response.text());
  } catch (err) {
    console.error("Error:", err);
  }
}

run();