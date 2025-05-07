// src/App.tsx
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import FilesPage from './Pages/FilesPage';
import theme from './Theme/theme';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FilesPage />
    </ThemeProvider>
  );
}

export default App;
