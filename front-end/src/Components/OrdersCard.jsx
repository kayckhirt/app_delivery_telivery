import PropTypes from 'prop-types';
import React from 'react';

function OrdersCard({ id, status, saleDate, totalPrice }) {
  const splitDate = saleDate.split('-');
  const day = splitDate[2].split('T')[0];
  const brDate = [day, splitDate[1], splitDate[0]].join('/');
  return (
    <a href={ `/customer/orders/${id}` }>
      <article>
        <p data-testid={ `customer_orders__element-order-id-${id}` }>{id}</p>

        <p data-testid={ `customer_orders__element-delivery-status-${id}` }>{status}</p>

        <p data-testid={ `customer_orders__element-order-date-${id}` }>{brDate}</p>

        <p data-testid={ `customer_orders__element-card-price-${id}` }>
          {totalPrice.replace('.', ',')}
        </p>
      </article>
    </a>
  );
}

export default OrdersCard;

OrdersCard.propTypes = {
  id: PropTypes.string,
  saleDate: PropTypes.string,
  price: PropTypes.string,
  status: PropTypes.string,
}.isRequired;
