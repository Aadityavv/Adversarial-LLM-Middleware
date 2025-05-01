import React from 'react';

const boxStyle = {
  marginBottom: '20px',
  padding: '15px',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9'
};

const contentStyle = {
  whiteSpace: 'pre-wrap',
  backgroundColor: 'white',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #eee'
};

const CorrectedBox = ({ correctedPrompt }) => {
  if (!correctedPrompt) return null;

  return (
    <div style={boxStyle}>
      <h2>Corrected Prompt</h2>
      <div style={contentStyle}>{correctedPrompt}</div>
    </div>
  );
};

export default CorrectedBox;