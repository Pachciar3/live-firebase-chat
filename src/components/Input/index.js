import React from 'react';

import './styles.scss';

function Input({type, id, name, value, handleChange}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={event => handleChange(event)}
      className="input"
    />
  );
}

export default Input;
