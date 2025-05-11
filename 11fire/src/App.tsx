// src/App.tsx
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Layout/router';
import theme from './Theme/theme';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
