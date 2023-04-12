import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@mui/material';
import React from 'react';
import formatDate from '../utils/formatDate';

function OrdersCard({
  id,
  status,
  saleDate,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
}) {
  const { pathname } = useLocation();

  const page = pathname.split('/')[1];
  return (
    <Box
      sx={ {
        display: 'flex',
        justifyContent: 'space-around',
        xs: { flexDirection: 'row' },
      } }
    >
      <Box
        sx={ {
          border: '1px solid black',
          borderRadius: '10px',
          width: {
            xs: '95%',
            md: '60%',
          },
          margin: '6px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
        } }
      >
        <Typography data-testid={ `${page}_orders__element-order-id-${id}` }>
          {`Pedido: ${id} `}
        </Typography>
        <Typography
          data-testid={ `${page}_orders__element-order-date-${id}` }
        >
          {` Data do pedido: ${formatDate(saleDate)}`}
        </Typography>

        <Typography data-testid={ `${page}_orders__element-card-price-${id}` }>
          {`R$: ${totalPrice.replace('.', ',')}`}
        </Typography>
        {page === 'seller' ? <p>{`${deliveryAddress}, ${deliveryNumber}`}</p> : null}
        <Link
          href={ `/${page}/orders/${id}` }
          underline="none"
        >
          <Button
            data-testid={ `${page}_orders__element-delivery-status-${id}` }
            sx={ {
              background: '#181654',
              color: 'white',
              marginLeft: '20px',
            } }
          >
            {status}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default OrdersCard;

OrdersCard.propTypes = {
  id: PropTypes.string,
  saleDate: PropTypes.string,
  price: PropTypes.string,
  status: PropTypes.string,
  deliveryAddress: PropTypes.string,
  deliveryNumber: PropTypes.string,
}.isRequired;
