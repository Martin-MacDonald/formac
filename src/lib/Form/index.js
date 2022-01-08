import React from 'react';
import { FormContext } from '../context';
import { useForm } from '../hooks';

const Form = ({ children, ...formProps }) => {
  const formData = useForm(formProps);
  const { handleSubmit } = formData;

  return (
    <FormContext.Provider value={formData}>
      <form onSubmit={handleSubmit}>
        {children(formData)}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
