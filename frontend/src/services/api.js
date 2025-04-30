import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const detectAdversarial = async (prompt) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/detect`, { prompt });
    return response.data;
  } catch (error) {
    console.error('Detection error:', error);
    throw error;
  }
};

export const correctPrompt = async (prompt) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/correct`, { prompt });
    return response.data;
  } catch (error) {
    console.error('Correction error:', error);
    throw error;
  }
};

export const queryLLM = async (prompt) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/query-llm`, { prompt });
    return response.data;
  } catch (error) {
    console.error('LLM query error:', error);
    throw error;
  }
};