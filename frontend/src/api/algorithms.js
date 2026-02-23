import axios from 'axios';

const API_BASE = 'http://localhost:5002/api';

export const runAlgorithm = async (algorithm, data) => {
  const response = await axios.post(`${API_BASE}/${algorithm}`, data);
  return response.data;
};

export const compareAlgorithms = async (data) => {
  const response = await axios.post(`${API_BASE}/compare`, data);
  return response.data;
};
