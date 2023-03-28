import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import CustomerProducts from '../Pages/CustomerProducts';
import CustomerOrderDetails from '../Pages/CustomerOrderDetails';
import CustomerCheckout from '../Pages/CustomerCheckout';
import SellerOrders from '../Pages/SellerOrders';
import SellerOrderDetails from '../Pages/SellerOrderDetails';
import CustomerOrders from '../Pages/CustomerOrders';
import Register from '../Pages/Register';
import AdminManage from '../Pages/AdminManage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route
        exact
        path="/customer/orders/:saleId"
        component={ CustomerOrderDetails }
      />
      <Route exact path="/customer/orders/" component={ CustomerOrders } />
      <Route exact path="/seller/orders/:id" component={ SellerOrderDetails } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/admin/manage" component={ AdminManage } />
    </Switch>
  );
}
export default Routes;
