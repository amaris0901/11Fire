import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const login = async (email: string, password: string) => {
  return axios.post(`${API_BASE}/api/auth/login`, { email, password });
};

export const signup = async (email: string, username: string, password: string) => {
  return axios.post(`${API_BASE}/api/auth/signup`, { email, username, password });
};
