import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Box } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { clearSession, getToken } from '../utils/localStorage';
import CartContext from '../Context/CartContext';
import logo from '../images/bitmap.png';

// import AppContext from '../Context/AppContext';

// const options = [
//   'Produtos',
//   'Meus Pedidos',
//   { user },
//   'Sair',
// ];

function NavBar() {
  const history = useHistory();
  const [user, setUser] = useState('');
  const { updateCartValue } = useContext(CartContext);
  const logout = useCallback(() => {
    clearSession();
    updateCartValue();
    history.push('/');
  }, [history, updateCartValue]);

  const myOrders = () => {
    const { role } = getToken();
    history.push(`/${role}/orders`);
  };

  const products = () => {
    const { role } = getToken();
    history.push(`/${role}/products`);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) logout();
    setUser(token.name);
  }, [logout]);

  return (
    <Box
      sx={ {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: '10vh',
        width: '100%',
        bgcolor: '#BB8220',
        paddingLeft: '20px',
      } }
    >
      <img src={ logo } alt='logo do app "O trago da velha"' width="100px" />
      <Box
        sx={ {
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          minHeight: '10vh',
          width: '100%',
          bgcolor: '#BB8220',
        } }
      >
        <Button
          data-testid="customer_products__element-navbar-link-products"
          type="button"
          onClick={ products }
          variant="contained"
          sx={ {
            width: {
              xs: '40px',
              md: '100px',
            },
          } }
        >
          Produtos
        </Button>
        <Button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ myOrders }
          variant="contained"
        >
          Meus Pedidos
        </Button>
        <Button
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
          variant="contained"
        >
          {user}
        </Button>
        <Button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ logout }
          variant="contained"
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
}

export default NavBar;
