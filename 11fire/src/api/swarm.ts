import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL;


export const createSwarm = async (password: string) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_BASE}/api/swarm/create`, { password }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};