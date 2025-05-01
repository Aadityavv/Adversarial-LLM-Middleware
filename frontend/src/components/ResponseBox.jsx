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

const ResponseBox = ({ llmResponse }) => {
  if (!llmResponse) return null;

  return (
    <div style={boxStyle}>
      <h2>LLM Response</h2>
      <div style={contentStyle}>{llmResponse}</div>
    </div>
  );
};

export default ResponseBox;