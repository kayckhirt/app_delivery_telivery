import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
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
    <a href={ `/${page}/orders/${id}` }>
      <article>
        <p data-testid={ `${page}_orders__element-order-id-${id}` }>{id}</p>

        <p data-testid={ `${page}_orders__element-delivery-status-${id}` }>{status}</p>

        <p
          data-testid={ `${page}_orders__element-order-date-${id}` }
        >
          {formatDate(saleDate)}
        </p>

        <p data-testid={ `${page}_orders__element-card-price-${id}` }>
          {totalPrice.replace('.', ',')}
        </p>
        {page === 'seller' ? <p>{`${deliveryAddress}, ${deliveryNumber}`}</p> : null}
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
  deliveryAddress: PropTypes.string,
  deliveryNumber: PropTypes.string,
}.isRequired;
