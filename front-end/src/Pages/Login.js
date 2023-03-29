import React, { useState, useEffect, useCallback } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const verifyBtn = useCallback(() => {
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const minLength = 5;
    const verifyEmail = email && regex.test(email);
    const verifyPassword = password.length > minLength;
    const emailAndPassword = verifyEmail && verifyPassword;
    setBtnIsDisabled(!(emailAndPassword));
  }, [email, password]);
  
  useEffect(() => {
    verifyBtn();
  }, [email, password, btnIsDisabled, verifyBtn]);

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = (({ target }) => {
    setPassword(target.value);
  });


  return (
    <div>
      <h1>NOMEDOAPP</h1>
      <form>
        <label htmlFor="login">
          Login :
          <input
            data-testid="common_login__input-email"
            id="email"
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={handleChangeEmail}
          />
        </label>
        <label htmlFor="password">
          Senha :
          <input
            data-testid="common_login__input-password"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={handleChangePassword}
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={btnIsDisabled}
        >
          Login
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
        >
          Ainda não tenho conta
        </button>
      </form>
      <div
      data-testid="common_login__element-invalid-email"
      ></div>
      </div>
      );
}
      export default Login;
