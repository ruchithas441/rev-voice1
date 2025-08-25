const ws = new WebSocket("ws://localhost:8080");

document.getElementById("sendBtn").addEventListener("click", () => {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (text) {
    appendMessage("You", text);
    ws.send(text);
    input.value = "";
  }
});

ws.onmessage = (event) => {
  const reply = event.data;
  appendMessage("Gemini", reply);
  speak(reply); // 🔊 Speak Gemini's reply
};

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ------------------ 🎙️ Speech Input ------------------
let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    appendMessage("You (voice)", transcript);
    ws.send(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };
}

document.getElementById("startVoiceBtn").addEventListener("click", () => {
  if (recognition) recognition.start();
});

document.getElementById("stopVoiceBtn").addEventListener("click", () => {
  if (recognition) recognition.stop();
});

// ------------------ 🔊 Speech Output ------------------
function speak(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  } else {
    console.warn("Speech synthesis not supported in this browser.");
  }
}