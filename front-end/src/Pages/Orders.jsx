import React, { useCallback, useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import NavBar from '../Components/NavBar';
import { getToken } from '../utils/localStorage';
import OrdersCard from '../Components/OrdersCard';
import api from '../services/api';

function Orders() {
  const [orders, setOrders] = useState([]);

  const userOrSeller = (role) => (role === 'customer' ? 'userId' : 'sellerId');

  const getOrders = useCallback(async () => {
    try {
      const { id, role } = getToken();
      const idTag = userOrSeller(role);
      const { data } = await api.get(`/sales/orders/?${idTag}=${id}`);
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);
  return (
    <Container
      sx={ {
        width: '100%',
        minHeight: '100vh' } }
    >
      <NavBar />
      <Box
        sx={ {
          width: '100%',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',

        } }
      >
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
      </Box>
    </Container>
  );
}
export default Orders;
