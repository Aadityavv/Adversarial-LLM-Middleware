import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const hasStarted = messages.length > 0;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error: Could not fetch response.' }]);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <Header />
      {!hasStarted ? (
        <div className="centered-input-wrapper">
          <InputBar input={input} setInput={setInput} onSend={sendMessage} />
        </div>
      ) : (
        <>
          <ChatWindow messages={messages} loading={loading} />
          <InputBar input={input} setInput={setInput} onSend={sendMessage} />
        </>
      )}
    </div>
  );
}

export default App;
