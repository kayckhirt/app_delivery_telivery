import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CommonForm from '../Components/CommonForm';
import api from '../services/api';
import { getToken, saveToken } from '../utils/localStorage';
import useForm from '../Hooks/UseForm';
import logo from '../images/bitmap.png';

const MIN_LENGTH_PASSWORD = 5;
const MIN_LENGTH_NAME = 11;
const EMAIL_REGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

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

  useEffect(() => {
    const userData = getToken();
    if (userData) {
      history.push('/customer/products');
    }
  }, [history]);

  const verifyBtn = useCallback(() => {
    const { email, password, name } = formData;

    const verifyEmail = email && EMAIL_REGEX.test(email);
    const verifyPassword = password.length > MIN_LENGTH_PASSWORD;
    const verifyLogin = verifyEmail && verifyPassword;
    const verifyRegister = verifyLogin && name.length > MIN_LENGTH_NAME;
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
      const { name, email, password } = formData;
      const {
        data,
      } = await api.post(
        isLogin ? '/login' : '/register',
        { email, password, name, role: 'customer' },
      );
      saveToken(data);
      setFormData({ email: '', password: '', name: '' });
      setBtnIsDisabled(true);
      const { role } = data;
      console.log(role);
      let endPoint = '';
      switch (role) {
      case 'administrator':
        endPoint = '/admin/manage';
        break;
      case 'seller':
        endPoint = '/seller/orders';
        break;
      default:
        endPoint = '/customer/products';
        break;
      }
      history.push(endPoint);
    } catch (err) {
      console.error(err);
      setIsNotFound(true);
    }
  };

  return (
    <Box
      sx={ { display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      } }
    >
      <img src={ logo } alt='logo do app "O trago da velha"' width="250px" />
      <Typography
        sx={ {
          fontSize: {
            xs: '4em',
            md: '7em',
          },
          fontFamily: 'Chakra Petch',
        } }
        gutterBottom
        color="#000000"
      >
        Têlivery

      </Typography>
      <CommonForm
        formData={ formData }
        // setFormData={ setFormData }
        onInputChange={ onInputChange }
        isNotFound={ isNotFound }
        isLogin={ isLogin }
        btnIsDisabled={ btnIsDisabled }
        handleLoginButton={ handleLoginButton }
      />
    </Box>
  );
}

export default Login;
