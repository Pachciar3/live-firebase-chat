import React from 'react';

import Spinner from 'react-spinner-material';
import './styles.scss';

function SubmitButton({type, children, loaded = true}) {
  return (
    <button type={type} className="button">
      <span>{children}</span>
      {loaded || (
        <span className="button__loader">
          <Spinner color="#FFF" radius={15} stroke={2} visible={true} />
        </span>
      )}
    </button>
  );
}

export default SubmitButton;
