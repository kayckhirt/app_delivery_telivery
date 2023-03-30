import PropTypes from 'prop-types';
import React from 'react';
// import { useHistory } from 'react-router-dom';
// import AppContext from '../Context/AppContext';

function Header({ id, price, urlImage, name }) {
  // const history = useHistory();
  // const { pathname } = history.location;

  return (
    <article>
      <p data-testid={ `customer_products__element-card-price-${id}` }>{price}</p>
      <img
        width={ 100 }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt="product_image"
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>

      <div>
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>

        <input
          value={ 0 }
          data-testid={ `customer_products__input-card-quantity-${id}` }
        />

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
