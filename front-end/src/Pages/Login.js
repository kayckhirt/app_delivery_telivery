import React, { useContext } from 'react';
import AppContext from '../Context/AppContext';

function Login() {
  const { teste } = useContext(AppContext);
  return (
    <div>{teste}</div>
  );
}
export default Login;
