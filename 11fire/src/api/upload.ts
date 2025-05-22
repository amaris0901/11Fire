import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL;


export const uploadFileToIPFS = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('token');
  const swarmId = localStorage.getItem('swarmId');

  const response = await axios.post(`${API_BASE}/api/upload`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-swarm-id': swarmId || '',
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data.cid;
};
