import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './components/ChatMessage';
import InputBar from './components/InputBar';
import { detectAdversarial, correctPrompt, queryLLM } from './services/api';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = inputText.trim();
    if (!prompt) return;

    setMessages((prev) => [...prev, { sender: 'user', text: prompt }]);
    setInputText('');
    setIsLoading(true);

    try {
      const detection = await detectAdversarial(prompt);
      if (detection.isAdversarial) {
        setMessages((prev) => [...prev, { sender: 'bot', text: '🔍 Adversarial detected. Correcting...' }]);
        const correction = await correctPrompt(prompt);
        setMessages((prev) => [...prev, { sender: 'bot', text: `✅ Corrected:\n${correction.correctedPrompt}` }]);
        const response = await queryLLM(correction.correctedPrompt);
        setMessages((prev) => [...prev, { sender: 'bot', text: response.response }]);
      } else {
        const response = await queryLLM(prompt);
        setMessages((prev) => [...prev, { sender: 'bot', text: response.response }]);
      }
    } catch {
      setMessages((prev) => [...prev, { sender: 'bot', text: '❌ Something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">Adversarial Input Detection and Correction</header>
      <div className="chat-container">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={bottomRef} />
      </div>
      <InputBar
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
