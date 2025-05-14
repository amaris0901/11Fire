import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const EmailLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const isEmailValid = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleLogin = async () => {
    const newErrors = { email: '', password: '' };
    let hasError = false;

    if (!email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!isEmailValid(email)) {
      newErrors.email = 'Enter a valid email address';
      hasError = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/swarm');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <Paper sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 4 }}>
      <Typography variant="h5" gutterBottom>Email Login</Typography>
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        sx={{ mb: 2 }}
      />
      <Button fullWidth variant="contained" onClick={handleLogin}>Login</Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Paper>
  );
};

export default EmailLoginPage;