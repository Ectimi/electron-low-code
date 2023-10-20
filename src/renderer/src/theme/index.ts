import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Theme {
    header: {
      background: string;
      text: string;
      button: string;
    };
  }

  interface ThemeOptions {
    header: {
      background: string;
      text: string;
      button: string;
    };
  }
}

const theme = createTheme({
  header: {
    background: grey[900],
    text: grey[50],
    button: grey[100],
  },
});

export default theme;
