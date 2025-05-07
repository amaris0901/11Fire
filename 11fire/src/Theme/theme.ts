import { createTheme } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles';

// ✅ Module augmentation for custom palette
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      tableBackground: string;
      tableHeader: string;
      searchBackground: string;
      addButton: string;
      border: string;
      iconGray: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      tableBackground: string;
      tableHeader: string;
      searchBackground: string;
      addButton: string;
      border: string;
      iconGray: string;
    };
  }
}

// ✅ Now create the theme using the extended PaletteOptions
const theme = createTheme({
  palette: {
    primary: {
      main: '#EF4444',
      dark: '#B91C1C',
    },
    secondary: {
      main: '#F97316',
    },
    background: {
      default: '#FFF7ED',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },
    custom: {
      tableBackground: '#fef7ed',
      tableHeader: '#f3ede1',
      searchBackground: '#e4dfd5',
      addButton: '#faae92',
      border: '#d6cfc1',
      iconGray: '#5f5a54',
    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default theme;
