// import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import api from '../services/api';
import formatDate from '../utils/formatDate';

const fields = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
];

function OrderDetailsTable() {
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const { pathname } = useLocation();

  const getOrderDetails = useCallback(async () => {
    try {
      const { data } = await api.get(`/sales/details/${id}`);
      setOrdersDetails(data);
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  const updateStatus = async (status) => {
    try {
      await api.patch(`/sales/status/${id}`, { status });
      getOrderDetails();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [getOrderDetails]);

  const page = pathname.split('/')[1];
  const part = `${page}_order_details__`;
  return (
    <div>
      <Box
        sx={ {
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: '20px',
        } }
      >
        <Typography
          data-testid={ `${part}element-order-details-label-order-id` }
          sx={ { fontSize: '1.2em' } }
        >
          {`Pedido: ${id} `}
        </Typography>
        <Typography
          id={ `${part}element-order-details-label-seller-name` }
          data-testid={ `${part}element-order-details-label-seller-name` }
          sx={ { fontSize: '1.2em' } }
        >
          {`Vendedor: ${ordersDetails.seller}`}
        </Typography>
        <Typography
          data-testid={ `${part}element-order-details-label-order-date` }
          sx={ { fontSize: '1.2em' } }
        >
          {`Data do pedido: 
          ${ordersDetails.saleDate && formatDate(ordersDetails.saleDate)}`}
        </Typography>
        <Typography
          id={ `${part}element-order-details-label-delivery-status-${id}` }
          data-testid={ `${part}element-order-details-label-delivery-status-${id}` }
          sx={ { fontSize: '1.2em' } }
        >
          {`Status: ${ordersDetails.status}`}
        </Typography>
        { page === 'customer'
          ? (
            <Button
              type="button"
              data-testid={ `${part}button-delivery-check` }
              disabled={ ordersDetails.status !== 'Em Trânsito' }
              variant="outlined"
              onClick={ () => updateStatus('Entregue') }
              background={ ordersDetails.status === 'Pendente' ? 'gray' : 'blue' }
            >
              MARCAR COMO ENTREGUE
            </Button>)
          : (
            <>
              <Button
                type="button"
                data-testid={ `${part}button-preparing-check` }
                disabled={ ordersDetails.status !== 'Pendente' }
                onClick={ () => updateStatus('Preparando') }
              >
                PREPARAR PEDIDO
              </Button>
              <Button
                type="button"
                data-testid={ `${part}button-dispatch-check` }
                disabled={ ordersDetails.status !== 'Preparando' }
                onClick={ () => updateStatus('Em Trânsito') }

              >
                SAIU PARA ENTREGA
              </Button>
            </>
          )}
      </Box>
      <TableContainer
        sx={ {
          marginTop: '100px',
        } }
      >
        <Table sx={ { minWidth: '400px' } }>
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell key={ field } sx={ { fontSize: '1.3em' } }>{field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(({ name, quantity, price, subTotal }, i) => (
              <TableRow key={ i }>
                <TableCell
                  data-testid={ `${part}element-order-table-item-number-${id}` }
                  sx={ { fontSize: '1.3em' } }
                >
                  {i + 1}
                </TableCell>
                <TableCell
                  data-testid={ `${part}element-order-table-name-${id}` }
                  sx={ { fontSize: '1.3em' } }
                >
                  {name}
                </TableCell>
                <TableCell
                  data-testid={ `${part}element-order-table-quantity-${id}` }
                  sx={ { fontSize: '1.3em' } }
                >
                  {quantity}
                </TableCell>
                <TableCell
                  data-testid={ `${part}element-order-table-unit-price-${id}` }
                  sx={ { fontSize: '1.3em' } }
                >
                  {price}
                </TableCell>
                <TableCell
                  data-testid={ `${part}element-order-table-sub-total-${id}` }
                  sx={ { fontSize: '1.3em' } }
                >
                  {subTotal}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        textAlign="center"
        sx={ {
          fontSize: '1.3em',
          marginTop: '10px',
        } }
      >
        <Typography variant="h5">
          Total:
          <span
            id={ `${part}element-order-total-price` }
            data-testid={ `${part}element-order-total-price` }
          >
            {` ${ordersDetails.totalPrice}`}
          </span>
        </Typography>
      </Box>
    </div>
  );
}

export default OrderDetailsTable;
