import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  // Scroll to the bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
      ))}
      {loading && <MessageBubble sender="bot" text="Typing..." />}
      
      {/* 👇 Anchor to scroll into view */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
