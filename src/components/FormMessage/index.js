import React from 'react';

import './styles.scss';

function FormMessage({children, type}) {
  return <div className={`form-message form-message--${type}`}>{children}</div>;
}

export default FormMessage;
