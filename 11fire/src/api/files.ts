import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const fetchFiles = async () => {
  const token = localStorage.getItem('token');
  const swarmId = localStorage.getItem('swarmId');

  const response = await axios.get(`${API_BASE}/api/files`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-swarm-id': swarmId || ''
    }
  });

  return response.data;
};
