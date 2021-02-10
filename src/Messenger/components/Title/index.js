import React from 'react';

import SoundBtn from '../SoundBtn';

function Title({children, handleSoundButton, messageSound}) {
  return (
    <div className="Messenger__header">
      <h1 className="Messenger__title">{children}</h1>
      <SoundBtn handleSoundButton={handleSoundButton} messageSound={messageSound} />
    </div>
  );
}

export default Title;
