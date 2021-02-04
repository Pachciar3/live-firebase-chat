import React from 'react';

import './styles.scss';

function Button({type, children}) {
  return (
    <button type={type} className="button">
      {children}
    </button>
  );
}

export default Button;
