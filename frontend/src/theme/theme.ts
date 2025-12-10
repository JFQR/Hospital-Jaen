import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b53f4e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#901919',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#b53f4e',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#901919',
          },
        },
      },
    },
  },
});
