import { useState } from 'react';

const useForm = (formState) => {
  const [formData, setFormData] = useState(formState);
  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return { formData, setFormData, onInputChange, onSelectChange };
};
export default useForm;
