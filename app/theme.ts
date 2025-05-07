import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // blue-500
    },
    secondary: {
      main: '#8b5cf6', // violet-500
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: 'rgba(255, 255, 255, 0.3)',
            '&.MuiButton-outlined': {
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backgroundColor: 'transparent',
            },
            '&.MuiButton-text': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    },
  },
}); 