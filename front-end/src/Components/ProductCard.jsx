import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, TextField, Typography } from '@mui/material';
import CartContext from '../Context/CartContext';

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
      updateGlobalAndLocalQuantity(numericQuantity);
    }
  };

  useEffect(() => {
    setLocalQuantity(getQuantity(id));
  }, [getQuantity, id]);

  return (
    <Card
      sx={ {
        background: 'white',
        padding: '2px',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '1px 1px 3px black',
      } }
    >
      <img
        width={ 100 }
        height={ 100 }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt="product_image"
      />
      <Typography
        data-testid={ `customer_products__element-card-price-${id}` }
        variant="h6"
        sx={ {
          fontWeight: 'bold',
        } }
      >
        {`R$ ${price.replace('.', ',')}`}
      </Typography>
      <Typography
        data-testid={ `customer_products__element-card-title-${id}` }
        variant="h6"
        sx={ {
          fontWeight: 'bold',
        } }
      >
        {name}
      </Typography>

      <div>
        <Button
          onClick={ handleRemoveOne }
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          variant="outlined"
          sx={ {
            height: '56px',
            fontSize: '2em',
            background: '#181654',
            color: 'white',
          } }
        >
          -
        </Button>

        <TextField
          onChange={ handleInput }
          name={ id }
          value={ localQuantity }
          data-testid={ `customer_products__input-card-quantity-${id}` }
          sx={ {
            fontSize: '2em',
            background: '#BB8220',
          } }
        />
        <Button
          onClick={ handleAddOne }
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          variant="outlined"
          sx={ {
            height: '56px',
            fontSize: '2em',
            background: '#181654',
            color: 'white',
          } }
        >
          +
        </Button>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default ProductCard;
