import React from 'react';
import { Navigate, Redirect, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      {/* <Route exact path="/" element={ () => <Redirect to="/login"/> } /> */}
      <Route exact path="/login" component={ Login } />
    </Switch>
  );
}
export default Routes;