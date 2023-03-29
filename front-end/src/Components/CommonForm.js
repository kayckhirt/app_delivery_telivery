import PropTypes from 'prop-types';
import React from 'react';

function CommonForm({
  isLogin,
  handleChangeEmail,
  handleChangePassword,
  handleChangeName,
  email,
  password,
  btnIsDisabled,
  name,
  history,
}) {
  const common = isLogin ? 'common_login__' : 'common_register__';
  return (
    <>
      <form>
        {!isLogin && (
          <label htmlFor="name">
            Nome :
            <input
              data-testid={ `${common}input-name"` }
              id="name"
              type="name"
              placeholder="Nome..."
              value={ name }
              onChange={ handleChangeName }
            />
          </label>
        )}
        <label htmlFor="email">
          Login :
          <input
            data-testid={ `${common}input-email"` }
            id="email"
            type="email"
            placeholder="email@email.com"
            value={ email }
            onChange={ handleChangeEmail }
          />
        </label>
        <label htmlFor="password">
          Senha :
          <input
            data-testid={ `${common}input-password` }
            id="password"
            type="password"
            placeholder="********"
            value={ password }
            onChange={ handleChangePassword }
          />
        </label>
        {isLogin && (
          <button
            data-testid={ `${common}button-login` }
            type="button"
            disabled={ btnIsDisabled }
          >
            Login
          </button>
        )}
        <button
          data-testid={ `${common}button-register` }
          type="button"
          onClick={ () => history.push('/register') }
        >
          {isLogin ? 'Ainda não tenho conta' : 'CADASTRAR'}
        </button>
      </form>
      <p data-testid={ `${common}element-invalid-email` }>elemento oculto</p>
    </>
  );
}

CommonForm.propTypes = {
  common: PropTypes.string,
  handleChangeEmail: PropTypes.func,
  handleChangePassword: PropTypes.func,
}.isRequired;

export default CommonForm;
