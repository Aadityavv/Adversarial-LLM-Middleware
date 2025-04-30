import React, { useState } from 'react';
import { detectAdversarial, correctPrompt, queryLLM } from './services/api';
import InputBox from './components/InputBox';
import StatusBox from './components/StatusBox';
import CorrectedBox from './components/CorrectedBox';
import ResponseBox from './components/ResponseBox';

const appContainerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const headingStyle = {
  color: '#333'
};

function App() {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('');
  const [correctedPrompt, setCorrectedPrompt] = useState('');
  const [llmResponse, setLlmResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setStatus('');
    setCorrectedPrompt('');
    setLlmResponse('');

    try {
      const detectionResult = await detectAdversarial(inputText);
      
      if (detectionResult.isAdversarial) {
        setStatus('Adversarial detected - correcting...');
        const correctionResult = await correctPrompt(inputText);
        setCorrectedPrompt(correctionResult.correctedPrompt);
        const llmResult = await queryLLM(correctionResult.correctedPrompt);
        setLlmResponse(llmResult.response);
        setStatus('Adversarial detected - used corrected prompt');
      } else {
        const llmResult = await queryLLM(inputText);
        setLlmResponse(llmResult.response);
        setStatus('Clean prompt - no corrections needed');
      }
    } catch (error) {
      setStatus('Error processing your request');
      console.error('Processing error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={appContainerStyle}>
      <h1 style={headingStyle}>Adversarial Prompt Protector</h1>
      
      <InputBox
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <StatusBox status={status} />
      <CorrectedBox correctedPrompt={correctedPrompt} />
      <ResponseBox llmResponse={llmResponse} />
    </div>
  );
}

export default App;