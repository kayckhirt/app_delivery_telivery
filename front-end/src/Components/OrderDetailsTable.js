// import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../services/api';
import formatDate from '../utils/formatDate';

const fields = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
];

const part = 'customer_order_details__';

function OrderDetailsTable() {
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [products, setProducts] = useState([]);

  const { saleId } = useParams();
  const getOrderDetails = useCallback(async () => {
    try {
      const { data } = await api.get(`/sales/details/${saleId}`);
      console.log(data);
      setOrdersDetails(data);
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  }, [saleId]);

  useEffect(() => {
    getOrderDetails();
  }, [getOrderDetails]);

  return (
    <div>
      {console.log(ordersDetails)}
      <div>
        <label htmlFor={ `${part}element-order-details-label-order-id` }>
          Pedido:
          {' '}
          <p
            id={ `${part}element-order-details-label-order-id` }
            data-testid={ `${part}element-order-details-label-order-id` }
          >
            {saleId}
          </p>
        </label>
        <label htmlFor={ `${part}element-order-details-label-seller-name` }>
          Vendedor:
          {' '}
          <p
            id={ `${part}element-order-details-label-seller-name` }
            data-testid={ `${part}element-order-details-label-seller-name` }
          >
            {ordersDetails.seller}
          </p>
        </label>
        Data do pedido:
        {' '}
        <p data-testid={ `${part}element-order-details-label-order-date` }>
          {ordersDetails.saleDate && formatDate(ordersDetails.saleDate)}
        </p>
        <label
          htmlFor={ `${part}element-order-details-label-delivery-status-${saleId}` }
        >
          Status:
          {' '}
          <p
            id={ `${part}element-order-details-label-delivery-status-${saleId}` }
            data-testid={ `${part}element-order-details-label-delivery-status-${saleId}` }
          >
            {ordersDetails.status}
          </p>
        </label>
        <button
          type="button"
          data-testid={ `${part}button-delivery-check` }
          disabled
        >
          MARCAR COMO ENTREGUE
        </button>
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
                data-testid={ `${part}element-order-table-item-number-${saleId}` }
              >
                {i + 1}
              </td>
              <td data-testid={ `${part}element-order-table-name-${saleId}` }>
                {name}
              </td>
              <td data-testid={ `${part}element-order-table-quantity-${saleId}` }>
                {quantity}
              </td>
              <td
                data-testid={ `${part}element-order-table-unit-price-${saleId}` }
              >
                {price}
              </td>
              <td
                data-testid={ `${part}element-order-table-sub-total-${saleId}` }
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
          {' '}
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
