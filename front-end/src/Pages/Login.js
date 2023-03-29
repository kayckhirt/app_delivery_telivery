import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import CommonForm from '../Components/CommonForm';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const [isLogin, setisLogin] = useState(true);
  const history = useHistory();

  const verifyBtn = useCallback(() => {
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const minLength = 5;
    const verifyEmail = email && regex.test(email);
    const verifyPassword = password.length > minLength;
    const emailAndPassword = verifyEmail && verifyPassword;
    setBtnIsDisabled(!emailAndPassword);
  }, [email, password]);
  useEffect(() => {
    verifyBtn();
  }, [email, password, btnIsDisabled, verifyBtn]);

  useEffect(() => {
    const isLoginRoute = history.location.pathname === '/login';
    setisLogin(isLoginRoute);
  }, [history.location.pathname]);

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <div>
      <h1>NOMEDOAPP</h1>
      <CommonForm
        history={ history }
        isLogin={ isLogin }
        email={ email }
        password={ password }
        btnIsDisabled={ btnIsDisabled }
        handleChangeEmail={ handleChangeEmail }
        handleChangePassword={ handleChangePassword }
      />
    </div>
  );
}

export default Login;
