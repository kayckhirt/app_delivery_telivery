import { Button, FormGroup,
  InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function RegisterUserForm(
  {
    onInputChange,
    formData: { name, email, password },
    handleRegisterBtn,
    btnIsDisabled,
  },
) {
  return (
    <FormGroup
      sx={ {
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: '',
      } }
    >
      <InputLabel
        htmlFor="name"
        sx={ { fontSize: '1.5em',
          display: 'flex',
          color: 'black',
          marginLeft: '5px' } }
      >
        Nome:
        <TextField
          type="text"
          id="name"
          data-testid="admin_manage__input-name"
          name="name"
          placeholder="Nome..."
          value={ name }
          onChange={ onInputChange }
          sx={ {
            background: 'white',
          } }
        />
      </InputLabel>
      <InputLabel
        htmlFor="email"
        sx={ { fontSize: '1.5em',
          display: 'flex',
          color: 'black',
          marginLeft: '5px' } }
      >
        Email:
        <TextField
          type="email"
          id="email"
          data-testid="admin_manage__input-email"
          name="email"
          placeholder="Email..."
          value={ email }
          onChange={ onInputChange }
          sx={ {
            background: 'white',
          } }
        />
      </InputLabel>
      <InputLabel
        htmlFor="password"
        sx={ { fontSize: '1.5em',
          display: 'flex',
          color: 'black',
          marginLeft: '5px' } }
      >
        Senha:
        {' '}
        <TextField
          type="password"
          id="password"
          data-testid="admin_manage__input-password"
          name="password"
          placeholder="Password..."
          value={ password }
          onChange={ onInputChange }
          sx={ {
            background: 'white',
          } }
        />
      </InputLabel>
      <InputLabel
        id="select-type"
        htmlFor="select-type"
        sx={ { fontSize: '1.5em',
          display: 'flex',
          color: 'black',
          marginLeft: '5px' } }
      >
        Tipo:
        {' '}
        <Select
          name="role"
          id="select-type"
          data-testid="admin_manage__select-role"
          onChange={ onInputChange }
          sx={ {
            background: 'white',
          } }
        >
          <MenuItem value="customer" sx={ { background: 'white' } }>
            Cliente
          </MenuItem>
          <MenuItem value="seller" sx={ { background: 'white' } }>
            Vendedor
          </MenuItem>
          <MenuItem value="administrator" sx={ { background: 'white' } }>
            Administrador
          </MenuItem>
        </Select>
      </InputLabel>
      <Button
        data-testid="admin_manage__button-register"
        type="button"
        disabled={ btnIsDisabled }
        onClick={ handleRegisterBtn }
        variant="contained"
        sx={ {
          background: '#181654',
          color: '#FFFFFF',
          padding: '15px',
        } }
      >
        CADASTRAR
      </Button>
    </FormGroup>
  );
}

RegisterUserForm.propTypes = {
  onInputChange: PropTypes.func,
  name: PropTypes.string,
}.isRequired;
export default RegisterUserForm;
