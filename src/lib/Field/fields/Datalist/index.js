import React from 'react';

const Datalist = ({ children, id, ...rest }) => {
  const listName = `${id}s`;
  return (
    <>
      <input list={listName} id={id} {...rest} />
      <datalist id={listName}>{children}</datalist>
    </>
  );
};

export default Datalist;
