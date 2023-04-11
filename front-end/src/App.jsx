import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import AppProvider from './Context/AppProvider';
import CartProvider from './Context/CartProvider';
import Routes from './Routes/Routes';
import theme from './Mui/AppTheme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <AppProvider>
          <CartProvider>
            <Routes />
          </CartProvider>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
