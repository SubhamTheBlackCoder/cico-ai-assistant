// useFoodAgent.js
import { useState } from "react";

// Custom hook for chat + TTS backend
const API_HOST = "http://127.0.0.1:5001";

export default function useFoodAgent() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Call backend for message
  async function sendMessage(input) {
    if (!input.trim()) return;
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    try {
      const res = await fetch(`${API_HOST}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      playTTS(data.response);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error processing request" }]);
    } finally {
      setLoading(false);
    }
  }

  // TTS playback
  async function playTTS(text) {
    try {
      const res = await fetch(`${API_HOST}/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang: "en" }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      new Audio(url).play();
    } catch (e) {}
  }

  return { messages, loading, sendMessage, playTTS };
}
