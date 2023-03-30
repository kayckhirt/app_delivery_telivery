import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './Context/AppProvider';
import CartProvider from './Context/CartProvider';
import Routes from './Routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
