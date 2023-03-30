import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import CommonForm from '../Components/CommonForm';
import api from '../services/api';
import { saveToken } from '../utils/localStorage';
import useForm from '../Hooks/UseForm';

function Login() {
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const [isLogin, setisLogin] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const history = useHistory();
  const { formData, setFormData, onInputChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const verifyBtn = useCallback(() => {
    const { email, password, name } = formData;
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const minLengthPassword = 5;
    const minLengthName = 11;
    const verifyEmail = email && regex.test(email);
    const verifyPassword = password.length > minLengthPassword;
    const verifyLogin = verifyEmail && verifyPassword;
    const verifyRegister = verifyLogin && name.length > minLengthName;
    setBtnIsDisabled(isLogin ? !verifyLogin : !verifyRegister);
  }, [formData, isLogin]);

  useEffect(() => {
    verifyBtn();
  }, [btnIsDisabled, verifyBtn]);

  useEffect(() => {
    const isLoginRoute = history.location.pathname === '/login';
    setisLogin(isLoginRoute);
  }, [history.location.pathname]);

  const handleLoginButton = async () => {
    try {
      const { email, password } = formData;
      const {
        data: { token },
      } = await api.post('/login', { email, password });
      saveToken(token);
      history.push('/customer/products');
    } catch (err) {
      console.log(err);
      setIsNotFound(true);
    }
  };

  return (
    <div>
      <h1>NOMEDOAPP</h1>
      <CommonForm
        formData={ formData }
        setFormData={ setFormData }
        onInputChange={ onInputChange }
        isNotFound={ isNotFound }
        history={ history }
        isLogin={ isLogin }
        btnIsDisabled={ btnIsDisabled }
        handleLoginButton={ handleLoginButton }
      />
    </div>
  );
}

export default Login;
