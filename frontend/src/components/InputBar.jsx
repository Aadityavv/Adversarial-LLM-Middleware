import React from 'react';

const InputBar = ({ input, setInput, onSend }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSend();
  };

  return (
    <div className="input-bar">
      <div className="input-bar-container">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onSend}>Send ➤</button>
      </div>
    </div>
  );
};

export default InputBar;
