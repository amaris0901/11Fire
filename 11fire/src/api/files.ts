import axios from 'axios';

export const fetchFiles = async () => {
  const res = await axios.get('http://localhost:3001/api/files');
  return res.data;
};
