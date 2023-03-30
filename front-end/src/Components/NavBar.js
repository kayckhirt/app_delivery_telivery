import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { clearSession, getToken } from '../utils/localStorage';
// import AppContext from '../Context/AppContext';

function NavBar() {
  const history = useHistory();
  const [user, setUser] = useState('');
  // const { pathname } = history.location;
  const logout = useCallback(() => {
    clearSession();
    history.push('/');
  }, [history]);

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
      >
        Produtos
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
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
