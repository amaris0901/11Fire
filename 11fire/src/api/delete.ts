import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL;


export const deleteFile = async (cid: string) => {
  const token = localStorage.getItem('token');
  const swarmId = localStorage.getItem('swarmId');

  const response = await axios.delete(`${API_BASE}/api/file/${cid}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-swarm-id': swarmId || ''
    }
  });

  return response.data;
};
