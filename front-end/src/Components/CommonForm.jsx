import { Button, FormControl, Stack, TextField, Typography } from '@mui/material';
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
      <FormControl
        sx={ {
          width: {
            xs: '90%',
            md: '500px',
          },
        } }
      >
        <Stack
          spacing={ 2 }
          padding={ 3 }
          borderRadius={ 5 }
          bgcolor="#FBAA10"
        >
          <Typography
            variant="h4"
            color="black"
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
              sx={ {
                boxShadow: '9px 9px 5px rgb(235, 118, 9)',
              } }
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
            sx={ {
              boxShadow: '9px 9px 5px rgb(235, 118, 10)',
            } }
          />
          <TextField
            data-testid={ `${common}input-password` }
            id="password"
            name="password"
            type="password"
            placeholder="Senha..."
            value={ password }
            onChange={ onInputChange }
            variant="outlined"
            sx={ {
              boxShadow: '9px 9px 5px rgb(235, 118, 10)',
            } }
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
            type="button"
            onClick={ isLogin ? () => history.push('/register') : handleLoginButton }
            disabled={ isLogin ? false : btnIsDisabled }
            variant="contained"
          >
            {isLogin ? 'Ainda não tenho conta' : 'CADASTRAR'}
          </Button>
        </Stack>
      </FormControl>
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
