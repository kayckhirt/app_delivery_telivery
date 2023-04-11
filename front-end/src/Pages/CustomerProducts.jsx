import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
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
      <Typography
        sx={ {
          fontSize: {
            xs: '2em',
            md: '3em',
          },
          fontFamily: 'Chakra Petch',
        } }
        gutterBottom
        color="#000000"
        textAlign="center"
      >
        Produtos

      </Typography>
      <Box
        sx={ {
          position: {
            xs: 'static',
            md: 'static',
          },
          left: {
            xs: '0%',
            md: '80%',
          },
        } }
      >
        <Button
          disabled={ totalCartValue === 0 }
          onClick={ handleRedirect }
          type="button"
          data-testid="customer_products__button-cart"
          variant="contained"
        >
          {`Ver Carrinho: ${totalCartValue.toFixed(2).replace('.', ',')}`}
        </Button>
      </Box>
      <Box
        sx={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          background: '#FBAA10',
        } }
      >
        {products.map(({ id, urlImage, price, name }) => (
          <Box
            key="true"
            sx={ {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: '3px',
            } }
          >
            <ProductCard
              key={ `${name}${id}` }
              id={ id }
              urlImage={ urlImage }
              name={ name }
              price={ price }
            />
          </Box>))}
      </Box>
    </>
  );
}
export default CustomerProducts;
