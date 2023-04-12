import { createTheme } from '@mui/material';

const fontUbuntu = 'Ubuntu Mono';
const theme = createTheme({
  palette: {
    primary: {
      main: '#181654',
    },
    background: {
      default: '#FBAA10',
      paper: '#212121',
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
  typography: {
    fontFamily: fontUbuntu,
    h1: {
      fontFamily: fontUbuntu,
    },
    h2: {
      fontFamily: fontUbuntu,
    },
    h3: {
      fontFamily: fontUbuntu,
    },
    h4: {
      fontFamily: fontUbuntu,
    },
    h6: {
      fontFamily: fontUbuntu,
    },
    h5: {
      fontFamily: fontUbuntu,
    },
    subtitle1: {
      fontFamily: fontUbuntu,
    },
    subtitle2: {
      fontFamily: fontUbuntu,
    },
    button: {
      fontFamily: fontUbuntu,
      fontWeight: 900,
    },
    overline: {
      fontFamily: fontUbuntu,
    },
  },
});

export default theme;
