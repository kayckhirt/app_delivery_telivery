import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './Context/AppProvider';
import Routes from './Routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
