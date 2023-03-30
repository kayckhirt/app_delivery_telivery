import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../Context/CartContext';
// import { useHistory } from 'react-router-dom';
// import AppContext from '../Context/AppContext';

function ProductCard({ id, price, urlImage, name }) {
  const { getQuantity, updateQuantity } = useContext(CartContext);
  const [localQuantity, setLocalQuantity] = useState(0);

  const updateLocalQuantity = () => {
    const globalQuantity = (getQuantity(id));
    setLocalQuantity(globalQuantity);
  };

  const updateGlobalAndLocalQuantity = (quantity) => {
    updateQuantity({ id, price, name, urlImage }, quantity);
    updateLocalQuantity();
  };

  const handleAddOne = () => {
    const newQuantity = getQuantity(id) + 1;
    updateGlobalAndLocalQuantity(newQuantity);
  };

  const handleRemoveOne = () => {
    const newQuantity = getQuantity(id) - 1;
    updateGlobalAndLocalQuantity(newQuantity);
  };

  const handleInput = (event) => {
    const newQuantity = event.target.value;
    const numericQuantity = Number(newQuantity);
    if (!Number.isNaN(numericQuantity)) {
      setLocalQuantity(numericQuantity);
    }
  };

  const handleBlur = () => {
    updateGlobalAndLocalQuantity(localQuantity);
  };

  useEffect(() => {
    setLocalQuantity(getQuantity(id));
  }, [getQuantity, id]);

  return (
    <article>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {price.replace('.', ',')}
      </p>
      <img
        width={ 100 }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt="product_image"
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>

      <div>
        <button
          onClick={ handleAddOne }
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>

        <input
          onChange={ handleInput }
          onBlur={ handleBlur }
          name={ id }
          value={ localQuantity }
          data-testid={ `customer_products__input-card-quantity-${id}` }
        />

        <button
          onClick={ handleRemoveOne }
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default ProductCard;
