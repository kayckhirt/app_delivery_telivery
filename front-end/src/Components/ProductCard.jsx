import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
    <Paper
      elevation={ 5 }
      component={ Stack }
      spacing={ 1 }
      justifyContent="space-between"
      alignItems="center"
      p={ 2 }
      minHeight="300px"
      sx={ { textAlign: 'center' } }
    >
      <Typography
        data-testid={ `customer_products__element-card-title-${id}` }
        variant="body1"
        sx={ {
          fontWeight: 'bold',
        } }
      >
        {name}
      </Typography>

      <Box
        component="img"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt="product_image"
        sx={ { maxHeight: '100px', maxWidth: '100px' } }
      />
      <Typography
        data-testid={ `customer_products__element-card-price-${id}` }
        variant="body1"
        sx={ {
          fontWeight: 'bold',
        } }
      >
        {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Typography>

      <Stack direction="row">
        <IconButton
          onClick={ handleRemoveOne }
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          color="secondary"
        >
          <RemoveIcon />

        </IconButton>

        <TextField
          onChange={ handleInput }
          name={ `${id}` }
          size="small"
          inputProps={ { style: { textAlign: 'center' } } }
          value={ localQuantity }
          data-testid={ `customer_products__input-card-quantity-${id}` }
          color="secondary"
        />
        <IconButton
          onClick={ handleAddOne }
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          color="secondary"
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default ProductCard;
