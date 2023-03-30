import PropTypes from 'prop-types';
import React from 'react';
// import { useHistory } from 'react-router-dom';
// import AppContext from '../Context/AppContext';

function Header({ id, price, image, title }) {
  // const history = useHistory();
  // const { pathname } = history.location;

  return (
    <article>
      <p data-testid={ `customer_products__element-card-price-${id}` }>{price}</p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ image }
        alt="product_image"
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{title}</p>

      <div>
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>

        <input data-testid={ `customer_products__input-card-quantity-${id}` } />

        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>
      </div>
    </article>
  );
}

Header.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Header;
