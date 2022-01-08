# About Formac

Formac is a user friendly and robust way to handle your React forms. It allows you to quickly build up your forms but also doesn't restrict your ability to style and customise the way they look. It simply handles all the state management for you so you can get to making it look beautiful! 
# Installation

```npm install formac```

# How to use formac

Formac is very simple to use and gives you freedom in how you want to structure your React forms.
## Components

There are 4 components that you can use....

```javascript
import { Form, Field, useForm, FormContext } from 'formac';
```

### **`<Form />`**

The Form component in essence is just an HTML `<form>` element. However behind the scenes it makes use of the `useForm` hook and `FormContext` to control all the child form elements and the submission of the form. You can use the Form component with the built in `Field` component as children or you can use your own components - if you are using your own components you will need to pass extra props to them (see below). You should use the Form component wherever you can instead of useForm and FormContext.

* Using own components
```javascript
import { Form } from 'formac';

<Form
  initialValues={{ age: '' }} // Required prop
  onSubmit={async (values, resetForm) => { // Required prop
    await saveForm(values);
    resetForm();
  }}
  validate={(values) => {
    const errors = {};
    if (values.age < 18) errors.age = 'You are under age!';
    return errors;
  }}
>
  {({ values, handleChange, handleBlur, touched, errors, isValid }) => (
    <>
      <label htmlFor='age'>Age</label>
      <input
        name='age'
        value={values[address]}
        onChange={handleChange}
        onBlur={handleBlur}
        type='number'
      />
      {errors.age && touched.age && <span className='error'>{errors.age}</span>}
      <button disabled={!isValid}>Submit</button>
    </>
  )}
</Form>
```

* Using Field Components
```javascript
import { Form } from 'formac';

<Form
  initialValues={{ age: '' }} // Required prop
  onSubmit={async (values, resetForm) => { // Required prop
    await saveForm(values);
    resetForm();
  }}
  validate={(values) => {
    const errors = {};
    if (values.age < 18) errors.age = 'You are under age!';
    return errors;
  }}
>
  {({ touched, errors, isValid }) => (
    <>
      <label htmlFor='age'>Age</label>
      <Field name='age' type='number' />
      {errors.age && touched.age && <span className='error'>{errors.age}</span>}
      <Field fieldType='button' disabled={!isValid}>Submit</button>
    </>
  )}
</Form>
```

**Form Props**
| Prop                 | Default | Required | Input                            | Return                     | Description |
|----------------------|---------|----------|----------------------------------|----------------------------|-------------|
| initialValues        | -       | Yes      | { [name]: value, ... }           | -                          | The initial state of all the fields in the form. The `name`'s provided must match the name prop passed to each field. |
| onSubmit             | -       | Yes      | (values, resetForm) => { ... }              | -                          | The function to be called when the form is valid and has attempted to be submitted. It will be passed all the form values and also a function to reset the form. |
| validate             | -       | No       | (values) => { ... }              | { [name]: string \| true } | This function is what is used to check if the form is valid. It will run anytime an `onChange`, `onBlur` or `submit` event happens (unless otherwise told not to). It must return an object with the `name` of the fields with errors and conditionally either just `true` to indicate that field is in error or a `string` stating the error reason. |
| initialErrors        | {}      | No       | { [name]: string \| true, ... }  | -                          | If you want to supply an initial error state to your form then you can do so here. Just supply an object with the `name` of the fields along with a `string` or `true` |
| initialTouched       | {}      | No       | { [name]: true, ... }            | -                          | If you want to let the form know that initially certain fields have been touched then do so here. |
| initialIsValid       | true    | No       | boolean                          | -                          | By default your form is valid but if you want to set it initially to `false` then this prop is for you. |
| runInitialValidation | false   | No       | boolean                          | -                          | As stated above, validation will only run `onChange`, `onBlur` or on `submit` events. If you want validation to run as soon as your form is loaded then set this prop to `true`. |
| validateOnChange     | true    | No       | boolean                          | -                          | If you do not want your form to validate on `onChange` events then set this prop to `false`. |
| validateOnBlur       | {}      | No       | boolean                          | -                          | If you do not want your form to validate on `onBlur` events then set this prop to `false`. |

**Props passed to Children**
| Prop            | Value                        | Description |
|-----------------|------------------------------|-------------|
| values          | { [name]: value, ... }       | The current values of all the fields in your form. If using your own component then `values[{name}]` should be passed to the `value` prop. |
| errors          | { [name]: string \| true }   | The current errors in your form. Accessed via `errors[{name}]`. |
| touched         | { [name]: true }             | The fields in your form that have been touched. Accessed via `touched[{name}]`. |
| handleChange    | (event) => { ... }           | This is the `onChange` handler that should be passed to custom components. If using `<Field />` then this is handled for you. It expects the `event` to have `{ target: { name, value } }`|
| setFieldValue   | ({ name, value }) => { ... } | If you need to set a field value outwith `onChange` then use this. It expects to passed `{ name, value }` |
| setValues       | (values) => { ... }          | If you want to override or set the values of all the fields then use this. It expects the same format as `initialValues` |
| handleBlur      | (event) => { ... }           | Much the same as the `handleChange` this is passed to any `<Field />` components. If you are caring about the touched properties then please pass this to your custom components `onBlur` prop. It expects the same event as `handleChange`. |
| validateForm    | () => { ... }                | If you want to run validation of your form at a point of your choosing then call this function. |
| handleSubmit    | (event) => { ... }                | If you have a button or otherwise that submits your form then this function will be called for you. But if need to call it yourself then you can do so. It only expects an event if called as part of a form onSubmit. |
| formSubmitCount | number                       | This is just a counter that keeps a track of how many times a form has attempted to be submitted. |
| resetForm       | () => { ... }                | If you need to reset a form then use this. It will set the values, errors and touched to the initial state and will reset the form submit counter to 0. |


### **`<Field />`**

The Field component can be either of the following HTML elements (it is an input by default):
  * input
  * select
  * textarea
  * button
  * datalist

Under the hood it is a native HTML element that you can add your own styling to. The only props that `<Field />` requires is `name` and `fieldType` (although for input you do not need to supply `fieldType`).

As well as this you can supply any prop that, that particular element allows such as `type`, `autocomplete` etc. There is a link to all the props each type of element takes in the table below.

```javascript
import { Form, Field } from 'formac';

<Form
  initialValues={{ name: '', age: 1, country: '', blurb: '', colour: '' }} // Required prop
  onSubmit={async (values, resetForm) => { // Required prop
    await saveForm(values);
    resetForm();
  }}
>
  {() => (
    <>
      <Field name='name' />
      <Field name='age' type='number' />
      <Field name='country' fieldType='select'>
        <option value='uk'>UK</option>
        <option value='us'>US</option>
        <option value='spain'>Spain</option>
      </Field>
      <Field name='blurb' fieldType='textarea' />
      <Field name='colour' fieldType='datalist'>
        <option value='blue' />
        <option value='red' />
        <option value='green' />
      </Field>
      <Field fieldType='button' />
    </>
  )}
</Form>
```

| Prop      | Required | Default  | Accepted Values                                     | Description |
|-----------|----------|----------|-----------------------------------------------------|-------------|
| name      | true     | -        | -                                                   | The `name` of the Field should be equal to the name passed in initialValues |
| fieldType | true     | 'input'  | 'input', 'select', 'button', 'textarea', 'datalist' | Since this defaults to 'input' it is technically not required for the input type. |
| className | false    | -        | string                                              | Add any className you want and it will be added to the HTML element |
| ...rest   | false    | -        | Any for the respective fieldType: [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), [select](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select), [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea), [datalist](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist), [button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) | Any of the props in the links can be safely added to the `Field` component and these will be added to the native HTML element. |

### **`useForm()`**

It is recommended to use the `Form` component as it wraps context round the `children`. However there may be instances where using the the `useForm` hook makes more sense. 

The inputs and outputs from `useForm` are the same as [Form](#form-).

```javascript
import { useForm } from 'formac';

const {
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
} = useForm({
  initialValues: { age: 10, country: '' },
  onSubmit: async (values, resetForm) => {
    await saveForm(values);
    resetForm(),
  },
  validate: (values) => {
    const errors = {};
    if (values.age < 18) errors.age = 'You are too young';
    return errors;
  }
})

return (
  <form onSubmit={handleSubmit}>
    <input
      name='age'
      value={values.age}
      onChange={handleChange}
      onBlur={handleBlur}
      type='number'
    />
    <button>Submit</button>
  </form>
);
```

### **`FormContext`**

As mentioned above FormContext is automatically added round the children of `Form`. However if you are using `useForm` instead and want to give your components context then it is there if you need it.

```javascript
import { useForm, FormContext } from 'formac';
const formData = useForm({
  initialValues: { age: 10, country: '' },
  onSubmit: async (values, resetForm) => {
    await saveForm(values);
    resetForm(),
  },
  validate: (values) => {
    const errors = {};
    if (values.age < 18) errors.age = 'You are too young';
    return errors;
  }
})

return (
  <FormContext.Provider value={formData}>
    <form onSubmit={formData.handleSubmit}>
      <MyInput /> 
      <MySelect />
    </form>
  </FormContext.Provider>
);
```