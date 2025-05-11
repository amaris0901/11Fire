// src/Pages/LoginPage.tsx
import React from 'react';
import { Box, Button, Typography, Avatar, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

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
          onClick={() => navigate('/swarm')}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: 'white',
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            px: 4,
            py: 1.2,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          Login with Microsoft
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
