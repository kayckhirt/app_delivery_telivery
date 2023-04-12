// import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Box, Button, Typography, TableContainer, Table } from '@mui/material';
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
          alignSelf: '',
        } }
      >
        <label htmlFor={ `${part}element-user-table-item-number-${id}` }>
          Pedido:
          <Typography
            data-testid={ `${part}element-order-details-label-order-id` }
          >
            {id}
          </Typography>
        </label>
        <label htmlFor={ `${part}element-order-details-label-seller-name` }>
          Vendedor:
          <Typography
            id={ `${part}element-order-details-label-seller-name` }
            data-testid={ `${part}element-order-details-label-seller-name` }
          >
            {ordersDetails.seller}
          </Typography>
        </label>
        <label htmlFor={ `${part}element-order-details-label-order-date` }>
          Data do pedido:
          <Typography data-testid={ `${part}element-order-details-label-order-date` }>
            {ordersDetails.saleDate && formatDate(ordersDetails.saleDate)}
          </Typography>
        </label>
        <label
          htmlFor={ `${part}element-order-details-label-delivery-status-${id}` }
        >
          Status:
          <Typography
            id={ `${part}element-order-details-label-delivery-status-${id}` }
            data-testid={ `${part}element-order-details-label-delivery-status-${id}` }
          >
            {ordersDetails.status}
          </Typography>
        </label>
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
      <TableContainer>
        <Table>
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={ field }>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(({ name, quantity, price, subTotal }, i) => (
              <tr key={ i }>
                <td
                  data-testid={ `${part}element-order-table-item-number-${id}` }
                >
                  {i + 1}
                </td>
                <td data-testid={ `${part}element-order-table-name-${id}` }>
                  {name}
                </td>
                <td data-testid={ `${part}element-order-table-quantity-${id}` }>
                  {quantity}
                </td>
                <td
                  data-testid={ `${part}element-order-table-unit-price-${id}` }
                >
                  {price}
                </td>
                <td
                  data-testid={ `${part}element-order-table-sub-total-${id}` }
                >
                  {subTotal}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <label htmlFor={ `${part}element-order-total-price` }>
            TOTAL:
            <span
              id={ `${part}element-order-total-price` }
              data-testid={ `${part}element-order-total-price` }
            >
              { ordersDetails.totalPrice }
            </span>
          </label>
        </div>
      </TableContainer>
    </div>
  );
}

export default OrderDetailsTable;
