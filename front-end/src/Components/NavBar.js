import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CartContext from '../Context/CartContext';
import { clearSession, getToken } from '../utils/localStorage';
// import AppContext from '../Context/AppContext';

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
    history.push('/customer/orders');
  };

  const products = () => {
    history.push('/customer/products');
  };

  useEffect(() => {
    const token = getToken();
    if (!token) logout();
    setUser(token.name);
  }, [logout]);

  return (
    <nav>
      <button
        data-testid="customer_products__element-navbar-link-products"
        type="button"
        onClick={ products }
      >
        Produtos
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        onClick={ myOrders }
      >
        Meus Pedidos
      </button>
      <button
        data-testid="customer_products__element-navbar-user-full-name"
        type="button"
      >
        {user}
      </button>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ logout }
      >
        Sair
      </button>
    </nav>
  );
}

export default NavBar;
