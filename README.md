# 🎙️ Rev Voice – Gemini Voice Chat App

## 📌 Overview
Rev Voice is a *voice-enabled chatbot* powered by *Google Gemini API*.  
It allows users to:
- Type or *speak* questions 🎤  
- Get *Gemini’s answers* as text 💬  
- Hear replies spoken aloud 🔊  

This project is built as part of an academic assignment and demonstrates how to combine:  
- Node.js + Express + WebSocket  
- Google Gemini API (@google/generative-ai)  
- Web Speech API (speech-to-text)  
- SpeechSynthesis API (text-to-speech)  

---

## ⚙️ Features
- *Text chat* with Gemini  
- *Voice input* using browser mic  
- *Voice output* using speech synthesis  
- *System instructions* so Gemini only talks about *Revolt Motors*  
- Simple browser UI  

---

## 🛠️ Tech Stack
- *Backend*: Node.js, Express, WebSocket  
- *Frontend*: HTML, JavaScript, Web Speech API  
- *AI*: Google Gemini (gemini-1.5-flash)  
- *Environment*: dotenv for API keys  

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/ruchithas441/rev-voice1.git
cd rev-voice1

### 2. Install dependencies
```bash
npm install

###3. Set Environment Variables
- Create .env file in the project root:
GOOGLE_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-1.5-flash
PORT=8080

### 4. Run Server
node server/index.js

### 5. Open Browser
Go To: http://localhost:8080


