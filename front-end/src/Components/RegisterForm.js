import React from 'react';

function RegisterForm() {
  return (
    <form>
      <input
        type="text"
        data-testid="common_register__input-name"
      />
      <input
        type="email"
        data-testid="common_register__input-email"
      />
      <input
        type="password"
        data-testid="common_register__input-password"
      />
      <button
        type="submit"
        data-testid="common_register__button-register"
      >
        CADASTRAR
      </button>
    </form>
  );
}
export default RegisterForm;
