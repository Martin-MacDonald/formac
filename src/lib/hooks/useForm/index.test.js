import {
  renderHook,
  act,
} from '@testing-library/react-hooks';
import useForm from '.';

const mockInitialValues = { one: '', two: '' };
const mockOnSubmit = jest.fn();
const mockValidate = (values) => {
  const errors = {};
  if (values.one !== '1') errors.one = 'One value is wrong';
  return errors;
};
const mockProps = {
  initialValues: mockInitialValues,
  onSubmit: mockOnSubmit,
  validate: mockValidate,
};

describe('useForm', () => {
  beforeEach(jest.clearAllMocks);

  describe('values', () => {
    it('should return the initial values passed in', () => {
      const { result } = renderHook(() =>
        useForm(mockProps)
      );
      expect(result.current.values).toEqual(
        mockInitialValues
      );
    });

    it('should update the values when handleChange is called', () => {
      const { result } = renderHook(() =>
        useForm(mockProps)
      );
      act(() => {
        result.current.handleChange({
          target: { name: 'one', value: '1' },
        });
      });
      expect(result.current.values).toMatchObject({
        one: '1',
      });
    });

    it('should update the values when setFieldValue is called', () => {
      const { result } = renderHook(() =>
        useForm(mockProps)
      );
      act(() => {
        result.current.setFieldValue({
          name: 'two',
          value: '2',
        });
      });
      expect(result.current.values).toMatchObject({
        two: '2',
      });
    });

    it('should reset form back to initialValues when resetForm is called', () => {
      const { result } = renderHook(() =>
        useForm(mockProps)
      );
      act(() => {
        result.current.handleChange({
          target: { name: 'one', value: '1' },
        });
      });
      act(() => {
        result.current.handleChange({
          target: { name: 'two', value: '2' },
        });
      });
      expect(result.current.values).toEqual({
        one: '1',
        two: '2',
      });
      act(() => {
        result.current.resetForm();
      });
      expect(result.current.values).toEqual(
        mockInitialValues
      );
    });

    it('should set the values at whatever is passed to setValues', () => {
      const { result } = renderHook(() =>
        useForm(mockProps)
      );
      const mockNewValues = { three: '3', four: '4' };
      act(() => {
        result.current.setValues(mockNewValues);
      });
      expect(result.current.values).toEqual(mockNewValues);
    });
  });

  describe('errors', () => {
    describe('runInitialValidation is false', () => {
      it('should initially return errors as an empty object if no initialErrors passed', () => {
        const { result } = renderHook(() =>
          useForm(mockProps)
        );
        expect(result.current.errors).toEqual({});
      });

      it('should initially return errors the same as initialErrors if passed', () => {
        const mockInitialErrors = { one: 'A big error' };
        const { result } = renderHook(() =>
          useForm({
            ...mockProps,
            initialErrors: mockInitialErrors,
          })
        );
        expect(result.current.errors).toEqual(
          mockInitialErrors
        );
      });
    });

    describe('runInitialValidation is true', () => {
      it('should initially return errors after validation', () => {
        const { result } = renderHook(() =>
          useForm({
            ...mockProps,
            runInitialValidation: true,
          })
        );
        expect(result.current.errors).toEqual({
          one: 'One value is wrong',
        });
      });

      it('should overwite any initialErrors passed in', () => {
        const mockInitialErrors = { one: 'A big error' };
        const { result } = renderHook(() =>
          useForm({
            ...mockProps,
            initialErrors: mockInitialErrors,
            runInitialValidation: true,
          })
        );
        expect(result.current.errors).toEqual({
          one: 'One value is wrong',
        });
      });
    });

    describe('validateOnChange is false', () => {
      it('should not update errors when change event happens', () => {
        const { result } = renderHook(() =>
          useForm({ ...mockProps, validateOnChange: false })
        );
        expect(result.current.errors).toEqual({});
        act(() => {
          result.current.handleChange({
            target: { name: 'one', value: '2' },
          });
        });
        expect(result.current.errors).toEqual({});
      });
    });

    describe('validateOnChange is true', () => {
      it('should update errors when change event happens', () => {
        const { result } = renderHook(() =>
          useForm(mockProps)
        );
        expect(result.current.errors).toEqual({});
        act(() => {
          result.current.handleChange({
            target: { name: 'one', value: '2' },
          });
        });
        expect(result.current.errors).toEqual({
          one: 'One value is wrong',
        });
      });
    });

    describe('validateOnBlur is false', () => {
      it('should not update errors when blur event happens', () => {
        const { result } = renderHook(() =>
          useForm({ ...mockProps, validateOnBlur: false })
        );
        expect(result.current.errors).toEqual({});
        act(() => {
          result.current.handleBlur({
            target: { name: 'one' },
          });
        });
        expect(result.current.errors).toEqual({});
      });
    });

    describe('validateOnBlur is true', () => {
      it('should update errors when blur event happens', () => {
        const { result } = renderHook(() =>
          useForm(mockProps)
        );
        expect(result.current.errors).toEqual({});
        act(() => {
          result.current.handleBlur({
            target: { name: 'one' },
          });
        });
        expect(result.current.errors).toEqual({ one: 'One value is wrong' });
      });
    });
  });

  describe('touched', () => {
    it('should return touched as empty object if no initialTouched passed in', () => {
      const { result } = renderHook(() => useForm(mockProps));
      expect(result.current.touched).toEqual({});
    });

    it('should return touched as initialTouched if passed in', () => {
      const { result } = renderHook(() => useForm({ ...mockProps, initialTouched: { one: true }}));
      expect(result.current.touched).toEqual({ one: true });
    });

    it('should update touched on blur events', () => {
      const { result } = renderHook(() => useForm(mockProps));
      expect(result.current.touched).toEqual({});
      act(() => {
        result.current.handleBlur({ target: { name: 'one' } });
      });
      expect(result.current.touched).toEqual({ one: true });
    });

    it('should not update if field already touched', () => {
      const { result } = renderHook(() => useForm(mockProps));
      expect(result.current.touched).toEqual({});
      act(() => {
        result.current.handleBlur({ target: { name: 'one' } });
      });
      expect(result.current.touched).toEqual({ one: true });
      act(() => {
        result.current.handleBlur({ target: { name: 'one' } });
      });
      expect(result.current.touched).toEqual({ one: true });
    });
  });

  describe('validateForm', () => {
    it('should not validate form if no validate function passed', () => {
      const { result } = renderHook(() => useForm({ ...mockProps, validate: undefined }));
      expect(result.current.errors).toEqual({});
      act(() => {
        result.current.validateForm();
      });
      expect(result.current.errors).toEqual({});
    });

    it('should validate form when called', () => {
      const { result } = renderHook(() => useForm(mockProps));
      expect(result.current.errors).toEqual({});
      act(() => {
        result.current.validateForm();
      });
      expect(result.current.errors).toEqual({ one: 'One value is wrong' });
    });
  });

  describe('isValid', () => {
    it('should return the isValid the same as initialIsValid', () => {
      const { result } = renderHook(() => useForm({ ...mockProps, initialIsValid: false }));
      expect(result.current.isValid).toBe(false)
    });

    it('should return the initial form as valid if no initialIsValid prop is passed', () => {
      const { result } = renderHook(() => useForm(mockProps));
      expect(result.current.isValid).toBe(true)
    });

    it('should return the form as invalid if there are errors once a change has happened', () => {
      const { result } = renderHook(() => useForm(mockProps));
      expect(result.current.isValid).toBe(true);
      act(() => {
        result.current.handleChange({ target: { name: 'one', value: '2' }});
      });
      expect(result.current.isValid).toBe(false);
    });

    it('should return the form as invalid if there are errors once a change has happened', () => {
      const { result } = renderHook(() => useForm({ ...mockProps, initialIsValid: false }));
      expect(result.current.isValid).toBe(false);
      act(() => {
        result.current.handleChange({ target: { name: 'one', value: '1' }});
      });
      expect(result.current.isValid).toBe(true);
    });
  });

  describe('handleSubmit', () => {
    it('should not submit the form if there are validation errors', () => {
      const { result } = renderHook(() => useForm(mockProps));
      act(() => {
        result.current.handleSubmit();
      });
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should submit the form if there are no validation errors', () => {
      const { result } = renderHook(() => useForm(mockProps));
      act(() => {
        result.current.handleChange({ target: { name: 'one', value: '1' } });
      });
      act(() => {
        result.current.handleSubmit();
      });
      expect(mockOnSubmit).toHaveBeenCalledWith({ one: '1', two: '' }, expect.any(Function));
    });

    it('should prevent default for form if event is passed', () => {
      const { result } = renderHook(() => useForm(mockProps));
      const mockPreventDefault = jest.fn();
      act(() => {
        result.current.handleSubmit({ preventDefault: mockPreventDefault  });
      });
      expect(mockPreventDefault).toHaveBeenCalled();
    });
  });

  describe('formSubmitCount', () => {
    it('should update the formSubmitCount for each time form is submitted', () => {
      const { result } = renderHook(() => useForm(mockProps));
      act(() => {
        result.current.handleSubmit();
      });
      expect(result.current.formSubmitCount).toBe(1);
      act(() => {
        result.current.handleSubmit();
      });
      expect(result.current.formSubmitCount).toBe(2);
    });
  });

  describe('resetForm', () => {
    it('should reset the form when called', () => {
      const { result } = renderHook(() => useForm(mockProps));
      act(() => {
        result.current.handleChange({ target: { name: 'one', value: '2' }});
      });
      act(() => {
        result.current.handleSubmit();
      });
      expect(result.current.values).toEqual({ one: '2', two: '' });
      expect(result.current.errors).toEqual({ one: 'One value is wrong' });
      expect(result.current.touched).toEqual({ one: true, two: true });
      expect(result.current.formSubmitCount).toBe(1);
      expect(result.current.isValid).toBe(false);
      act(() => {
        result.current.resetForm();
      });
      expect(result.current.values).toEqual(mockInitialValues);
      expect(result.current.errors).toEqual({});
      expect(result.current.touched).toEqual({});
      expect(result.current.formSubmitCount).toBe(0);
      expect(result.current.isValid).toBe(true);
    });
  });
});
