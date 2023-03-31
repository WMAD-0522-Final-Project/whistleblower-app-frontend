import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 375,
      md: 540,
      lg: 768,
      xl: 1440,
    },
  },
});

export default theme;
