import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', username: '', password: '' });
  const navigate = useNavigate();

  const isEmailValid = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleSignup = async () => {
    const newErrors = { email: '', username: '', password: '' };
    let hasError = false;

    if (!email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!isEmailValid(email)) {
      newErrors.email = 'Enter a valid email address';
      hasError = true;
    }

    if (!username) {
      newErrors.username = 'Username is required';
      hasError = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      const res = await axios.post('http://localhost:3001/api/auth/signup', { email, username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/swarm');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <Paper sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 4 }}>
      <Typography variant="h5" gutterBottom>Sign Up</Typography>
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
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!errors.username}
        helperText={errors.username}
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
      <Button fullWidth variant="contained" onClick={handleSignup}>Sign Up</Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account? <Link to="/email-login">Login</Link>
      </Typography>
    </Paper>
  );
};

export default SignupPage;
