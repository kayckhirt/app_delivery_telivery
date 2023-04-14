import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Box, IconButton, Paper, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { clearSession, getToken } from '../utils/localStorage';
import CartContext from '../Context/CartContext';
import logo from '../images/bitmap.png';

function NavBar() {
  const history = useHistory();
  const [user, setUser] = useState('');
  const [userRole, setUserRole] = useState('');
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
    setUserRole(token.role);
  }, [logout]);

  return (
    <Paper
      sx={ {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: '7vh',
        width: '100%',
        bgcolor: '#FBAA10',
        paddingLeft: '20px',
      } }
    >
      <Box
        component="img"
        src={ logo }
        alt='logo do app "O trago da velha"'
        sx={ { width: '75px' } }
      />
      <Box
        sx={ {
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          minHeight: '7vh',
          width: '100%',
          bgcolor: '#FBAA10',
        } }
      >
        {userRole !== 'seller' && (
          <Button
            data-testid="customer_products__element-navbar-link-products"
            onClick={ products }
          >
            Produtos
          </Button>
        )}
        <Button
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ myOrders }
        >
          Pedidos
        </Button>
        <Typography
          display={ { xs: 'none', md: 'block' } }
          color="primary"
        >
          {user}
        </Typography>
        <IconButton
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ logout }
          color="primary"
        >
          <LogoutIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default NavBar;
