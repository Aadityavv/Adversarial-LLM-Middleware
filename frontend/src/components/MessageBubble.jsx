import React from 'react';

const MessageBubble = ({ sender, text }) => (
  <div className={`message ${sender}`}>
    {text}
  </div>
);

export default MessageBubble;
