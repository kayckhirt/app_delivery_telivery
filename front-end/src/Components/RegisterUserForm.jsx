import PropTypes from 'prop-types';
import React from 'react';

function RegisterUserForm(
  {
    onInputChange,
    formData: { name, email, password },
    handleRegisterBtn,
    isDisabledBtn,
  },
) {
  return (
    <form>
      <label htmlFor="name">
        Nome:
        <input
          type="text"
          id="name"
          data-testid="admin_manage__input-name"
          name="name"
          placeholder="Nome..."
          value={ name }
          onChange={ onInputChange }
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          id="email"
          data-testid="admin_manage__input-email"
          name="email"
          placeholder="Email..."
          value={ email }
          onChange={ onInputChange }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          id="password"
          data-testid="admin_manage__input-password"
          name="password"
          placeholder="Password..."
          value={ password }
          onChange={ onInputChange }
        />
      </label>
      <label htmlFor="select-type">
        Tipo:
        <select
          name="role"
          id="select-type"
          data-testid="admin_manage__select-role"
          onChange={ onInputChange }
        >
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
          <option value="administrator">Administrador</option>
        </select>
      </label>
      <button
        data-testid="admin_manage__button-register"
        type="button"
        disabled={ isDisabledBtn }
        onClick={ handleRegisterBtn }
      >
        CADASTRAR
      </button>
    </form>
  );
}

RegisterUserForm.propTypes = {
  onInputChange: PropTypes.func,
  name: PropTypes.string,
}.isRequired;
export default RegisterUserForm;
