import { useState, useEffect, useRef } from 'react';

const useForm = ({
  initialValues,
  onSubmit,
  initialTouched = {},
  initialErrors = {},
  initialIsValid = true,
  runInitialValidation = false,
  validate,
  validateOnChange = true,
  validateOnBlur = true,
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [isValid, setIsValid] = useState(initialIsValid);
  const [formSubmitCount, setFormSubmitCount] = useState(0);
  const valuesEffectRef = useRef(null);
  const touchedEffectRef = useRef(null);

  const validateForm = () => {
    if (!validate) return true;
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return !!Object.keys(validationErrors).length;
  };

  useEffect(() => {
    const formIsValid = !!Object.keys(errors).length;
    setIsValid(formIsValid);
  }, [errors]);

  useEffect(() => {
    if (runInitialValidation) {
      validateForm();
    }
  }, []);

  useEffect(() => {
    if (validateOnChange && valuesEffectRef.current) {
      validateForm();
    }
    if (!valuesEffectRef) {
      valuesEffectRef.current = true;
    }
  }, [values]);

  useEffect(() => {
    if (validateOnBlur && touchedEffectRef.current) {
      validateForm();
    }
    if (!touchedEffectRef) {
      touchedEffectRef.current = true;
    }
  }, [touched]);

  const updateValue = ({ name, value }) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    updateValue({ name, value });
  };

  const setFieldValue = ({ name, value }) => {
    updateValue({ name, value });
  };

  const handleBlur = event => {
    const { name } = event.target;
    if (!touched[name]) {
      setTouched(prevTouched => ({
        ...prevTouched,
        [name]: true,
      }));
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors(initialErrors);
    setTouched(initialTouched);
  };

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    setFormSubmitCount(
      prevFormSubmit => prevFormSubmit + 1
    );
    setTouched(
      Object.keys(values).reduce(
        (touchedFields, field) => ({
          ...touchedFields,
          [field]: true,
        }),
        {}
      )
    );
    if (validateForm()) {
      onSubmit(values);
      resetForm();
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setValues,
    handleBlur,
    validateForm,
    isValid,
    handleSubmit,
    formSubmitCount,
    resetForm,
  };
};

export default useForm;
