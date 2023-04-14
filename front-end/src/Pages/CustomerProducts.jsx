import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Fab, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
    <Container sx={ { mb: 4 } }>

      <NavBar />
      <Typography
        sx={ {
          fontSize: {
            xs: '2em',
            md: '3em',
          },
        } }
        gutterBottom
        textAlign="center"
      >
        Produtos

      </Typography>

      <Grid container spacing={ 2 }>

        {products.map(({ id, urlImage, price, name }) => (
          <Grid
            item
            xs={ 6 }
            md={ 3 }
            key={ id }
          >
            <ProductCard
              key={ `${name}${id}` }
              id={ id }
              urlImage={ urlImage }
              name={ name }
              price={ price }
            />
          </Grid>))}

      </Grid>
      <Fab
        color="primary"
        variant="extended"
        disabled={ totalCartValue === 0 }
        onClick={ handleRedirect }
        data-testid="customer_products__button-cart"
        sx={ {
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
          '&:hover': {
            transform: 'scale(1.15)',
          },
        } }
      >
        <ShoppingCartIcon />
        {totalCartValue
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Fab>
    </Container>

  );
}
export default CustomerProducts;
