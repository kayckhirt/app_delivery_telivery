import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

function CommonForm({
  onInputChange,
  formData: { email, password, name },
  isLogin,
  isNotFound,
  handleLoginButton,
  btnIsDisabled,
}) {
  const history = useHistory();
  const common = isLogin ? 'common_login__' : 'common_register__';
  return (
    <>
      <form>
        {!isLogin && (
          <label htmlFor="name">
            Nome :
            <input
              name="name"
              data-testid={ `${common}input-name` }
              id="name"
              type="name"
              placeholder="Nome..."
              value={ name }
              onChange={ onInputChange }
            />
          </label>
        )}
        <label htmlFor="email">
          Login :
          <input
            data-testid={ `${common}input-email` }
            id="email"
            name="email"
            type="email"
            placeholder="email@email.com"
            value={ email }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="password">
          Senha :
          <input
            data-testid={ `${common}input-password` }
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={ password }
            onChange={ onInputChange }
          />
        </label>
        {isLogin && (
          <button
            data-testid={ `${common}button-login` }
            type="button"
            disabled={ btnIsDisabled }
            onClick={ handleLoginButton }
          >
            Login
          </button>
        )}
        <button
          data-testid={ `${common}button-register` }
          type="button"
          onClick={ isLogin ? () => history.push('/register') : handleLoginButton }
          disabled={ isLogin ? false : btnIsDisabled }
        >
          {isLogin ? 'Ainda não tenho conta' : 'CADASTRAR'}
        </button>
      </form>
      {isNotFound && (
        <p
          data-testid={ `${common}element-invalid${isLogin ? '-email' : '_register'}` }
        >
          {isLogin ? 'Email ou senha inválidos' : 'O usuário já existe'}
        </p>
      )}
    </>
  );
}

CommonForm.propTypes = {
  common: PropTypes.string,
  handleChangeEmail: PropTypes.func,
  handleChangePassword: PropTypes.func,
}.isRequired;

export default CommonForm;
