import React from 'react';

const boxStyle = {
  marginBottom: '20px',
  padding: '15px',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9'
};

const baseMessageStyle = {
  padding: '10px',
  borderRadius: '4px',
  fontWeight: 'bold'
};

const adversarialStyle = {
  ...baseMessageStyle,
  backgroundColor: '#ffebee',
  color: '#c62828'
};

const cleanStyle = {
  ...baseMessageStyle,
  backgroundColor: '#e8f5e9',
  color: '#2e7d32'
};

const StatusBox = ({ status }) => {
  const messageStyle = status.includes('Adversarial') 
    ? adversarialStyle 
    : cleanStyle;
  
  return (
    <div style={boxStyle}>
      <h2>Status</h2>
      <div style={messageStyle}>
        {status || 'No submission yet'}
      </div>
    </div>
  );
};

export default StatusBox;