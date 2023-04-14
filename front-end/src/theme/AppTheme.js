import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#181654',
    },
    secondary: {
      main: '#FBAA10',
    },

  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'question' },
          style: {
            border: '2px solid black',
          },
        },
      ],
    },
  },

});

export default theme;
