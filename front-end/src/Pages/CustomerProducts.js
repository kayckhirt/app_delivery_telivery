import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../Components/Loading';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import CartContext from '../Context/CartContext';

function CustomerProducts() {
  const history = useHistory();
  const { loadingProducts, products, totalCartValue } = useContext(CartContext);

  if (loadingProducts) return <Loading />;

  const handleRedirect = () => {
    history.push('/customer/checkout');
  };

  return (
    <>
      <NavBar />
      <h3>CustomerProducts</h3>
      <div>
        <button
          disabled={ totalCartValue === 0 }
          onClick={ handleRedirect }
          type="button"
          data-testid="customer_products__button-cart"
        >
          {totalCartValue.toFixed(2).replace('.', ',')}

        </button>
        <p
          data-testid="customer_products__checkout-bottom-value"
        >
          {totalCartValue.toFixed(2).replace('.', ',')}
        </p>
      </div>
      {products.map(({ id, price, urlImage, name }) => (
        <ProductCard
          key={ `${name}${id}` }
          id={ id }
          price={ price }
          urlImage={ urlImage }
          name={ name }
        />))}
    </>
  );
}
export default CustomerProducts;
