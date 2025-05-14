import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL;


export const fetchFiles = async () => {
  const res = await axios.get(`${API_BASE}/api/files`);
  return res.data;
};
