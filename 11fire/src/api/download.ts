import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL;


export const downloadFile = async (cid: string, filename: string) => {
  const token = localStorage.getItem('token');
  const swarmId = localStorage.getItem('swarmId');

  const response = await axios.get(`${API_BASE}/api/download/${cid}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-swarm-id': swarmId || ''
    },
    responseType: 'blob' // Important for binary download
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
