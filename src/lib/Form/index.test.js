jest.mock('../hooks', () => ({
  useForm: jest.fn(),
}));

import React from 'react';
import {
  render,
  screen,
  act,
} from '@testing-library/react';
import Form from '.';
import { useForm } from '../hooks';

describe('Form', () => {
  it('should render the form component with children', () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());
    useForm.mockImplementation(() => ({
      handleSubmit: mockHandleSubmit,
    }));
    render(<Form>{() => <button>Submit</button>}</Form>);
    const submitButton = screen.getByRole('button', {
      name: 'Submit',
    });
    act(() => {
      submitButton.click();
    });
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
