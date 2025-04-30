import React from 'react';
import './ChatMessage.css';

function ChatMessage({ sender, text }) {
  const isUser = sender === 'user';
  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
      <div className="chat-bubble">{text}</div>
    </div>
  );
}

export default ChatMessage;
