import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import { getToken } from '../utils/localStorage';
import OrdersCard from '../Components/OrdersCard';
import api from '../services/api';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  const getOrders = useCallback(async () => {
    try {
      const { id } = getToken();
      console.log(id);
      const { data } = await api.post('/sales/orders/', { userId: id });
      console.log(data);
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
        orders.map(({ id, status, saleDate, totalPrice }) => (
          <OrdersCard
            key={ id }
            id={ id }
            status={ status }
            saleDate={ saleDate }
            totalPrice={ totalPrice }
          />
        ))
      }
      {}
    </div>
  );
}
export default CustomerOrders;
