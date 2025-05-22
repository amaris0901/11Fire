import React from 'react';
import { Box, Button, Typography, Avatar, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { selectRole } from '../api/swarm';

const UserOption = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const buttonStyle = {
    bgcolor: theme.palette.primary.main,
    color: 'white',
    borderRadius: 2,
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    width: '200px',
    height: '44px',
    '&:hover': {
      bgcolor: theme.palette.primary.dark,
    },
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 360,
          height: 420,
          bgcolor: theme.palette.background.default,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4,
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: 'grey.400',
            mb: 2,
          }}
        />
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 6, fontSize: '1.7rem', color: theme.palette.text.primary }}
        >
          11Fire
        </Typography>
        <Button
          variant="contained"
          sx={{ ...buttonStyle, mb: 2 }}
          onClick={async () => {
            try {
              const swarmId = localStorage.getItem('swarmId');
              if (!swarmId) return alert('No Swarm ID found');
              await selectRole(swarmId, 'user');
              navigate('/files');
            } catch (err) {
              alert('Failed to select role');
            }
          }}
        >
          Use Storage
        </Button>
        <Button
          variant="contained"
          sx={{ ...buttonStyle, mb: 2 }}
          onClick={async () => {
            try {
              const swarmId = localStorage.getItem('swarmId');
              if (!swarmId) return alert('No Swarm ID found');
              await selectRole(swarmId, 'provider');
              navigate('/provider-dashboard');
            } catch (err) {
              alert('Failed to select role');
            }
          }}
        >
          Provide Storage
        </Button>
      </Box>
    </Box>
  );
};

export default UserOption;