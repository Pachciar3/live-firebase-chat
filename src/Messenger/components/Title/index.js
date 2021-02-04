import React from 'react';

import VolumeOn from '../../../icons/VolumeOn';
import VolumeOff from '../../../icons/VolumeOff';

function Title({children, handleSoundButton, messageSound}) {
  function volumeIcon() {
    if (messageSound) {
      return <VolumeOn />;
    }
    return <VolumeOff />;
  }
  return (
    <div className="Messenger__header">
      <h1 className="Messenger__title">{children}</h1>
      <button
        className="Messenger__sound-button"
        onClick={handleSoundButton}
        label="Włącz/Wyłącz dźwięk wiadomości"
      >
        {volumeIcon()}
      </button>
    </div>
  );
}

export default Title;
