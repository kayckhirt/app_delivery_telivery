// import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../services/api';

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

  const { saleId } = useParams();
  const getOrderDetails = useCallback(async () => {
    try {
      const { data } = await api.get(`/sales/details/${saleId}`);
      console.log(data);
      setOrdersDetails(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getOrderDetails();
  }, [getOrderDetails]);

  return (
    <div>
      {console.log(ordersDetails)}
      <div>
        <p
          data-testid={ `${part}element-order-details-label-order-id` }
        >
          {saleId}
        </p>
        <p
          data-testid={ `${part}element-order-details-label-seller-name` }
        >
          Vendedor

        </p>
        <p
          data-testid={ `${part}element-order-details-label-order-date` }
        >
          data
        </p>
        <p
          data-testid={ `${part}element-order-details-label-delivery-status-${saleId}` }
        >
          status
        </p>
        <button
          type="button"
          data-testid={ `${part}button-delivery-check` }
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
          <tr>
            <td
              data-testid={ `${part}element-order-table-item-number-${saleId}` }
            >
              id
            </td>
            <td
              data-testid={ `${part}element-order-table-name-${saleId}` }
            >
              produto
            </td>
            <td
              data-testid={ `${part}element-order-table-quantity-${saleId}` }
            >
              quant
            </td>
            <td
              data-testid={ `${part}element-order-table-unit-price-${saleId}` }
            >
              val
            </td>
            <td
              data-testid={ `${part}element-order-table-sub-total-${saleId}` }
            >
              sub
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <span
          data-testid={ `${part}element-order-total-price` }
        >
          TOTAL
        </span>
      </div>
    </div>
  );
}

export default OrderDetailsTable;
