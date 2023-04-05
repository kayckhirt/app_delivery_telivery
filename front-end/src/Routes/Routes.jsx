import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import CustomerProducts from '../Pages/CustomerProducts';
import AdminManage from '../Pages/AdminManage';
import Checkout from '../Pages/Checkout';
import Orders from '../Pages/Orders';
import OrderDetails from '../Pages/OrderDetails';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Login } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route
        exact
        path="/customer/orders/:id"
        component={ OrderDetails }
      />
      <Route exact path="/customer/orders/" component={ Orders } />
      <Route exact path="/seller/orders/:id" component={ OrderDetails } />
      <Route exact path="/seller/orders" component={ Orders } />
      <Route exact path="/admin/manage" component={ AdminManage } />
    </Switch>
  );
}
export default Routes;
