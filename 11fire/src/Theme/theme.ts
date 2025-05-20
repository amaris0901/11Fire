import { createTheme } from '@mui/material/styles';


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


const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFAF4',  
    },
    secondary: {
      main: '#EB6464',  
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
    fontFamily: 'Inter, sans-serif',  
  },
});

export default theme;
