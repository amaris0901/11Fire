import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL;


export const createSwarm = async (password: string) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_BASE}/api/swarm/create`, { password }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const joinSwarm = async (swarmId: string, password: string) => {
    const token = localStorage.getItem('token');
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/swarm/join`, { swarmId, password }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

export const selectRole = async (role: 'user' | 'provider') => {
    const token = localStorage.getItem('token');
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/swarm/role`, {role}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  