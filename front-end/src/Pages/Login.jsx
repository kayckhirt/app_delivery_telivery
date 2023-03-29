import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import CommonForm from '../Components/CommonForm';
import api from '../services/api';
import { saveToken } from '../utils/localStorage';
import useForm from '../Hooks/UseForm';

function Login() {
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
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
    const { email, password } = formData;
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const minLength = 5;
    const verifyEmail = email && regex.test(email);
    const verifyPassword = password.length > minLength;
    const emailAndPassword = verifyEmail && verifyPassword;
    setBtnIsDisabled(!emailAndPassword);
  }, [formData]);

  useEffect(() => {
    verifyBtn();
  }, [btnIsDisabled, verifyBtn]);

  useEffect(() => {
    const isLoginRoute = history.location.pathname === '/login';
    setisLogin(isLoginRoute);
  }, [history.location.pathname]);

  // const handleChangeEmail = ({ target }) => {
  //   setEmail(target.value);
  // };

  // const handleChangeName = ({ target }) => {
  //   setName(target.value);
  // };

  // const handleChangePassword = ({ target }) => {
  //   setPassword(target.value);
  // };

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
