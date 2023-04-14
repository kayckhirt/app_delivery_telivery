import { Button, Stack, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const SHADOW = {
  boxShadow: '6px 6px 5px #C7C7C7',
};

function CommonForm({
  onInputChange,
  formData: { email, password, name },
  isLogin,
  isNotFound,
  handleLoginButton,
  btnIsDisabled,
  setisLogin,
}) {
  const history = useHistory();
  const common = isLogin ? 'common_login__' : 'common_register__';
  return (
    <>
      <Stack
        spacing={ 2 }
        sx={ {
          width: {
            xs: '90%',
            md: '400px',
            textAlign: 'center',
          },
        } }
      >
        <Typography
          variant="h4"
        >
          {isLogin ? 'Login' : 'Cadastro' }
        </Typography>
        {!isLogin && (
          <TextField
            name="name"
            data-testid={ `${common}input-name` }
            id="name"
            type="name"
            placeholder="Nome..."
            value={ name }
            onChange={ onInputChange }
            variant="outlined"
            autoFocus="true"
            sx={ SHADOW }
          />
        )}
        <TextField
          data-testid={ `${common}input-email` }
          id="email"
          name="email"
          type="email"
          placeholder="Email..."
          value={ email }
          onChange={ onInputChange }
          variant="outlined"
          autoFocus={ !!isLogin }
          sx={ SHADOW }
        />
        <TextField
          data-testid={ `${common}input-password` }
          name="password"
          type="password"
          placeholder="Senha..."
          value={ password }
          onChange={ onInputChange }
          variant="outlined"
          sx={ SHADOW }
        />
        {isLogin && (
          <Button
            data-testid={ `${common}button-login` }
            type="button"
            disabled={ btnIsDisabled }
            onClick={ handleLoginButton }
            variant="contained"
          >
            Login
          </Button>
        )}
        <Button
          data-testid={ `${common}button-register` }
          onClick={ isLogin ? () => history.push('/register') : handleLoginButton }
          disabled={ isLogin ? false : btnIsDisabled }
          variant="contained"
        >
          {isLogin ? 'Ainda não tenho conta' : 'CADASTRAR'}
        </Button>

        {!isLogin ? (
          <Button
            onClick={ () => {
              setisLogin(true);
              history.push('/login');
            } }
            variant="contained"
          >
            Cancelar
          </Button>) : null}
      </Stack>

      {isNotFound && (
        <Typography
          data-testid={ `${common}element-invalid${isLogin ? '-email' : '_register'}` }
          variant="body1"
          color="error"
        >
          {isLogin ? 'Email ou senha inválidos' : 'O usuário já existe'}
        </Typography>
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
