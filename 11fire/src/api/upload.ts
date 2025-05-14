import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL;


export const uploadFileToIPFS = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 15000, // Optional: wait up to 15s for backend to reply
    });

    return response.data.cid as string;
  } catch (err: any) {
    // Enhanced logging
    if (err.response) {
      console.error('Upload failed with response:', err.response.data);
    } else if (err.request) {
      console.error('Upload failed: No response received', err.request);
    } else {
      console.error('Upload setup failed:', err.message);
    }
    throw err;
  }
};
