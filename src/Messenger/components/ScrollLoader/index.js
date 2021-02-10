import React from 'react';

import Spinner from 'react-spinner-material';

function ScrollLoader({wantScrollMessages, haveScrollMessages}) {
  function checkLoader() {
    if (wantScrollMessages && haveScrollMessages) {
      return <Spinner radius={35} color={'blueviolet'} stroke={3} />;
    }
  }

  return <div className="Messenger__scroll-loader">{checkLoader()}</div>;
}

export default ScrollLoader;
