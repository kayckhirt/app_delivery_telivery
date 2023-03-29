import React from 'react';
// import { useHistory } from 'react-router-dom';
// import AppContext from '../Context/AppContext';

function NavBar() {
  // const history = useHistory();
  // const { pathname } = history.location;

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
        Nome cliente
      </button>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
      >
        Sair
      </button>
    </nav>
  );
}

export default NavBar;
