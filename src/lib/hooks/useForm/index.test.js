import {
  renderHook,
  act,
} from '@testing-library/react-hooks';
import useForm from '.';

const mockInitialValues = { one: '', two: '' };
const mockOnSubmit = jest.fn();
const mockProps = {
  initialValues: mockInitialValues,
  onSubmit: mockOnSubmit,
};

describe('useForm', () => {
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
});
