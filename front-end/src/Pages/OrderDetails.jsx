import React from 'react';
import { Container } from '@mui/material';
import NavBar from '../Components/NavBar';
import OrderDetailsTable from '../Components/OrderDetailsTable';

function OrderDetails() {
  return (
    <Container>
      <NavBar />
      <OrderDetailsTable />
    </Container>
  );
}

export default OrderDetails;
