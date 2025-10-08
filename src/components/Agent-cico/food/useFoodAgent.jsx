import { useState } from "react";
const API_HOST = "http://127.0.0.1:5001"; // or your backend address

export default function useFoodAgent() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  // To remember the language code for each response
  const [lastLang, setLastLang] = useState("en");

  async function sendMessage(input) {
    if (!input.trim()) return;
    setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: input }]);
    try {
      const res = await fetch(`${API_HOST}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.response }
      ]);
      setLastLang(data.lang || "en");
      // Play TTS in the detected language!
      playTTS(data.response, data.lang || "en");
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Error processing request" }
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function playTTS(text, lang) {
    try {
      const res = await fetch(`${API_HOST}/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang: lang || "en" }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      new Audio(url).play();
    } catch (e) {
      // Optionally handle/playback errors
    }
  }

  return { messages, loading, sendMessage, playTTS };
}
