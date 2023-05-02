import { createTheme } from '@mui/material';
import { cyan } from '@mui/material/colors';

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#5C6103',
      contrastText: '#FFCA48'
    },
    secondary: {
      main: '#FFCA48',
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff'
    },
    background: {
      paper: ' #FFCA48',
      default: '#5C6103'
    }
  }
});
