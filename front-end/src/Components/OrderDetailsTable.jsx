// import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
      <div>
        <label htmlFor={ `${part}element-user-table-item-number-${id}` }>
          Pedido:
          <p
            data-testid={ `${part}element-order-details-label-order-id` }
          >
            {id}
          </p>
        </label>
        <label htmlFor={ `${part}element-order-details-label-seller-name` }>
          Vendedor:
          <p
            id={ `${part}element-order-details-label-seller-name` }
            data-testid={ `${part}element-order-details-label-seller-name` }
          >
            {ordersDetails.seller}
          </p>
        </label>
        Data do pedido:
        <p data-testid={ `${part}element-order-details-label-order-date` }>
          {ordersDetails.saleDate && formatDate(ordersDetails.saleDate)}
        </p>
        <label
          htmlFor={ `${part}element-order-details-label-delivery-status-${id}` }
        >
          Status:
          <p
            id={ `${part}element-order-details-label-delivery-status-${id}` }
            data-testid={ `${part}element-order-details-label-delivery-status-${id}` }
          >
            {ordersDetails.status}
          </p>
        </label>
        { page === 'customer'
          ? (
            <button
              type="button"
              data-testid={ `${part}button-delivery-check` }
              disabled={ ordersDetails.status !== 'Em Trânsito' }
              onClick={ () => updateStatus('Entregue') }
            >
              MARCAR COMO ENTREGUE
            </button>)
          : (
            <>
              <button
                type="button"
                data-testid={ `${part}button-preparing-check` }
                disabled={ ordersDetails.status !== 'Pendente' }
                onClick={ () => updateStatus('Preparando') }
              >
                PREPARAR PEDIDO
              </button>
              <button
                type="button"
                data-testid={ `${part}button-dispatch-check` }
                disabled={ ordersDetails.status !== 'Preparando' }
                onClick={ () => updateStatus('Em Trânsito') }

              >
                SAIU PARA ENTREGA
              </button>
            </>
          )}
      </div>
      <table>
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
      </table>
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
    </div>
  );
}

export default OrderDetailsTable;
