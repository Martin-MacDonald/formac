import React from 'react';
import { render, screen, configure } from '@testing-library/react';
import { FormContext } from '../context';
import Field from '.';

const mockContextValues = {
  values: { one: '1', two: '2' },
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
};

configure({ testIdAttribute: 'id' })

const renderWithContext = (component) =>
  render(
    <FormContext.Provider value={mockContextValues}>
      {component}
    </FormContext.Provider>
  );

describe('Field', () => {
  it('should render a button if fieldType is of type button', () => {
    renderWithContext(<Field fieldType='button'>Button text</Field>);
    expect(screen.getByText('Button text')).toBeInTheDocument();
  });

  it('should render an input type if fieldType is absent', () => {
    renderWithContext(<Field name='one' />);
    const input = screen.queryByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'one');
    expect(input).toHaveAttribute('value', '1');
    expect(input).toHaveAttribute('id', 'one');
  });

  it('should render an input type if fieldType is input', () => {
    renderWithContext(<Field fieldType='input' name='one' />);
    const input = screen.queryByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'one');
    expect(input).toHaveAttribute('value', '1');
    expect(input).toHaveAttribute('id', 'one');
  });

  it('should render a select type if fieldType is select', () => {
    renderWithContext(<Field fieldType='select' name='one'><option value='1'>1</option></Field>);
    const select = screen.queryByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('name', 'one');
    expect(select).toHaveAttribute('id', 'one');
  });

  it('should render a textarea type if fieldType is textarea', () => {
    renderWithContext(<Field fieldType='textarea' name='one' />);
    const textarea = screen.queryByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('name', 'one');
    expect(textarea).toHaveAttribute('id', 'one');
  });

  it('should render a datalist type if fieldType is datalist', () => {
    renderWithContext(<Field fieldType='datalist' name='one'><option value='1' /></Field>);
    const datalist = screen.queryByRole('combobox');
    expect(datalist).toBeInTheDocument();
    expect(datalist).toHaveAttribute('name', 'one');
    expect(datalist).toHaveAttribute('id', 'one');
    expect(datalist).toHaveAttribute('list', 'ones');
    expect(datalist).toHaveAttribute('value', '1');
  });
});
