import React, { useContext } from 'react';
import { FormContext } from '../context';
import {
  Button,
  Datalist,
  Input,
  Select,
  Textarea,
} from './fields';

const fields = {
  datalist: Datalist,
  input: Input,
  select: Select,
  textarea: Textarea,
};

const Field = ({ fieldType = 'input', name, ...rest }) => {
  const { values, handleChange, handleBlur } = useContext(
    FormContext
  );

  if (fieldType === 'button') {
    return <Button {...rest} />;
  }

  const value = values[name];
  const Component = fields[fieldType];
  return (
    <Component
      {...{
        ...rest,
        name,
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        id: name,
      }}
    />
  );
};

export default Field;
