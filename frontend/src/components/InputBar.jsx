import React from 'react';
import './InputBar.css';

function InputBar({ value, onChange, onSubmit, isLoading }) {
  return (
    <form className="input-bar" onSubmit={onSubmit}>
      <textarea
        className="input-field"
        placeholder="Type your message..."
        value={value}
        onChange={onChange}
        disabled={isLoading}
      />
      <button className="send-button" type="submit" disabled={isLoading}>
        ➤
      </button>
    </form>
  );
}

export default InputBar;
