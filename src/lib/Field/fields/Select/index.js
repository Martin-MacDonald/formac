import React from 'react';

const Select = ({ children, ...rest }) => {
  return <select {...rest}>{children}</select>;
};

export default Select;
