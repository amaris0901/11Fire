import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Avatar,
  TextField,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { joinSwarm } from '../api/swarm';

const JoinSwarm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [swarmId, setSwarmId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleJoin = async () => {
    setError('');
    if (!swarmId || !password || password.length < 8) {
      setError('Please enter valid swarm ID and a password (min 8 characters)');
      return;
    }
    try {
      await joinSwarm(swarmId, password);
      alert(`Joined swarm successfully!
Swarm ID: ${swarmId}`);
      localStorage.setItem('swarmId', swarmId);
      navigate('/user-option');
    } catch (err) {
      setError('Join failed. Please check swarm ID and password.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Box
        sx={{
          width: 500,
          height: 600,
          bgcolor: theme.palette.background.default,
          borderRadius: 3,
          px: 4,
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: 'grey.400', mb: 1 }} />
          <Typography sx={{ fontSize: '1.7rem', fontWeight: 700, mb: 1, color: theme.palette.text.primary }}>
            11Fire
          </Typography>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '1rem', color: theme.palette.text.primary, mb: 1 }}>
            Swarm ID
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter swarm ID"
            value={swarmId}
            onChange={(e) => setSwarmId(e.target.value)}
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, input: { py: 1.5 } }}
          />

          <Typography sx={{ fontWeight: 500, fontSize: '1rem', color: theme.palette.text.primary, mb: 1, mt: 3 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, input: { py: 1.5 } }}
          />
        </Box>

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          <Button
            onClick={handleJoin}
            sx={{
              width: '300px',
              bgcolor: theme.palette.primary.main,
              color: 'white',
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              height: 44,
              mb: 2,
              '&:hover': { bgcolor: theme.palette.primary.dark },
            }}
          >
            Join
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate('/swarm')}
            sx={{
              width: '300px',
              borderRadius: 2,
              height: 44,
              color: theme.palette.primary.main,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              bgcolor: theme.palette.background.default,
              borderColor: theme.palette.custom.border,
              '&:hover': { bgcolor: '#f4ebe2' },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JoinSwarm;