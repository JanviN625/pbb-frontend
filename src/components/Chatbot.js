import React, { useState, useRef, useEffect } from "react";
import "../styles/Chatbot.css";

function Chatbot({ summary }) {
  const [messages, setMessages] = useState([
    { text: summary.question, sender: "user" },
    { text: "Typing...", sender: "bot", waiting: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Replace initial "Typing..." with actual bot message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) =>
        prev.filter((msg) => !msg.waiting).concat({
          text: "Thanks for your question. I'm looking into it!",
          sender: "bot"
        })
      );
    }, 1500); // delay for initial bot response

    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input.trim(), sender: "user" };
    const waitingMessage = { text: "Typing...", sender: "bot", waiting: true };

    setMessages((prev) => [...prev, userMessage, waitingMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) =>
        prev.filter((msg) => !msg.waiting).concat({
          text: "This is a placeholder response from the bot.",
          sender: "bot"
        })
      );
    }, 1500);
  };

  return (
    <div className="chatbot-area">
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chatbot-message ${msg.sender} ${
              msg.waiting ? "waiting" : ""
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-wrapper">
        <textarea
          className="chatbot-input"
          placeholder="Type your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Submit</button>
      </div>
    </div>
  );
}

export default Chatbot;