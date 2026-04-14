import axios from 'axios';

const API_URL = 'https://real-estate-project-gmh9.onrender.com/api';

export const loginAdmin = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const fetchAllContent = async () => {
  const response = await axios.get(`${API_URL}/content`);
  return response.data;
};

export const updateContent = async (section, data, token) => {
  const response = await axios.put(`${API_URL}/content/${section}`, { data }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
