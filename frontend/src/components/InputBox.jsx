import React from 'react';

const formStyle = {
  marginBottom: '20px'
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  resize: 'vertical'
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#cccccc',
  cursor: 'not-allowed'
};

const InputBox = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} style={formStyle}>
      <textarea
        style={textareaStyle}
        value={value}
        onChange={onChange}
        placeholder="Enter your prompt here..."
        rows={5}
        disabled={isLoading}
      />
      <button 
        type="submit" 
        style={isLoading ? disabledButtonStyle : buttonStyle}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
};

export default InputBox;