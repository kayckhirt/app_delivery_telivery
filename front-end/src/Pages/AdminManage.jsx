import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import RegisterUserForm from '../Components/RegisterUserForm';
import ClientsTable from '../Components/ClientsTable';

import api from '../services/api';
import useForm from '../Hooks/UseForm';

const MIN_LENGTH_PASSWORD = 5;
const MIN_LENGTH_NAME = 11;
const EMAIL_REGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const intialFormData = {
  name: '',
  email: '',
  password: '',
  role: 'customer',
};

function AdminManage() {
  const { formData, setFormData, onInputChange } = useForm(intialFormData);

  const [isDisabledBtn, setisDisabledBtn] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  const verifyBtn = useCallback(() => {
    const { email, password, name } = formData;
    const verifyEmail = email && EMAIL_REGEX.test(email);
    const verifyPassword = password.length > MIN_LENGTH_PASSWORD;
    const verifyName = name.length > MIN_LENGTH_NAME;
    const verifyRegister = verifyEmail && verifyPassword && verifyName;
    setisDisabledBtn(!verifyRegister);
  }, [formData]);

  useEffect(() => {
    verifyBtn();
  }, [isDisabledBtn, verifyBtn]);

  const handleRegisterBtn = async () => {
    try {
      const { email, password, name, role } = formData;
      await api.post('/register', { name, email, password, role });
      setFormData(intialFormData);
    } catch (err) {
      console.error(err);
      setIsNotFound(true);
    }
  };
  return (
    <div>
      <NavBar />
      Criar novo usuário
      {isNotFound
        && (
          <p
            data-testid="admin_manage__element-invalid-register"
          >
            deu errado
          </p>
        )}
      <RegisterUserForm
        handleRegisterBtn={ handleRegisterBtn }
        formData={ formData }
        onInputChange={ onInputChange }
        isDisabledBtn={ isDisabledBtn }
      />
      <ClientsTable />
    </div>
  );
}
export default AdminManage;
