import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import { getToken } from '../utils/localStorage';
import OrdersCard from '../Components/OrdersCard';
import api from '../services/api';

function Orders() {
  const [orders, setOrders] = useState([]);

  const userOrSeller = (role) => (role === 'costumer' ? 'userId' : 'sellerId');

  const getOrders = useCallback(async () => {
    try {
      const { id, role } = getToken();
      const { data } = await api.get(`/sales/orders/?${userOrSeller(role)}=${id}`);
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);
  return (
    <div>
      <NavBar />
      {
        orders.map(({
          id,
          status,
          saleDate,
          totalPrice,
          deliveryAddress,
          deliveryNumber,
        }) => (
          <OrdersCard
            key={ id }
            id={ id }
            status={ status }
            saleDate={ saleDate }
            totalPrice={ totalPrice }
            deliveryAddress={ deliveryAddress }
            deliveryNumber={ deliveryNumber }
          />
        ))
      }
      {}
    </div>
  );
}
export default Orders;
