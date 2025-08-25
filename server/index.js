import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 8080;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

wss.on("connection", async (ws) => {
  console.log("🔗 Client connected");

  const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
  const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        { text: "You are Rev, a virtual assistant for Revolt Motors. Only answer questions related to Revolt Motors (bikes, services, support). If asked about anything else, politely say you can only help with Revolt Motors." }
      ]
    }
  ]
});

  ws.on("message", async (message) => {
    const text = message.toString();
    console.log("👤 User:", text);

    try {
      const result = await chat.sendMessage(text);
      const reply = result.response.text();
      console.log("🤖 Gemini:", reply);

      ws.send(reply);
    } catch (err) {
      console.error("❌ Error:", err);
      ws.send("Error: " + err.message);
    }
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});

app.use(express.static("web"));

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`  );
});