import React from 'react';
import RegisterForm from '../Components/RegisterForm';
import InvalidMsg from '../Components/InvalidMsg';

function Register() {
  return (
    <div>
      Register
      <RegisterForm />
      <InvalidMsg message="E-mail inválido" testId="register" />
    </div>
  );
}
export default Register;
