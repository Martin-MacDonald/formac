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
  const formIsValidRef = useRef(null);

  const validateForm = () => {
    if (!validate) return true;
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return !Object.keys(validationErrors).length;
  };

  useEffect(() => {
    if (formIsValidRef.current) {
      const formIsValid = !Object.keys(errors).length;
      setIsValid(formIsValid);
    }
    if (!formIsValidRef.current) {
      formIsValidRef.current = true;
    }
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
    if (!valuesEffectRef.current) {
      valuesEffectRef.current = true;
    }
  }, [values]);

  useEffect(() => {
    if (validateOnBlur && touchedEffectRef.current) {
      validateForm();
    }
    if (!touchedEffectRef.current) {
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
    valuesEffectRef.current = null;
    touchedEffectRef.current = null;
    formIsValidRef.current = null;
    setValues(initialValues);
    setErrors(initialErrors);
    setTouched(initialTouched);
    setIsValid(initialIsValid);
    setFormSubmitCount(0);
  };

  const handleSubmit = (event) => {
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
      onSubmit(values, resetForm);
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
