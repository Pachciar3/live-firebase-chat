import React from 'react';

import VolumeOn from '../../../icons/VolumeOn';
import VolumeOff from '../../../icons/VolumeOff';

function SoundBtn({handleSoundButton, messageSound}) {
  function volumeIcon() {
    if (messageSound) {
      return <VolumeOn />;
    }
    return <VolumeOff />;
  }
  return (
    <button
      className="Messenger__sound-button"
      onClick={handleSoundButton}
      label="Włącz/Wyłącz dźwięk wiadomości"
      title="Włącz lub Wyłącz dźwięk wiadomości"
    >
      {volumeIcon()}
    </button>
  );
}

export default SoundBtn;
