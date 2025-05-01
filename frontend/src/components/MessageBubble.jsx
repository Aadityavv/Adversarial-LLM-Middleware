import React from 'react';

const MessageBubble = ({ sender, text, adversarial_detected, original_prompt }) => {
  return (
    <div className={`bubble ${sender}`}>
      <div className="bubble-content">{text}</div>

      {sender === 'bot' && adversarial_detected !== undefined && (
        <div className="adversarial-icon-wrapper">
          <span
            className="adv-info-icon"
            title={
              adversarial_detected
                ? `⚠️ Adversarial detected\nOriginal: ${original_prompt}`
                : '✅ Not Adversarial'
            }
          >
            ℹ️
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
