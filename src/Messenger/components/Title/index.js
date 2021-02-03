import React from 'react';

import VolumeOn from "../../../icons/VolumeOn"
import VolumeOff from "../../../icons/VolumeOff";

function Title({ children, handleSoundButton, messageSound }) {
  function volumenIcon() {
    if (messageSound) {
      return <VolumeOn />
    }
    return <VolumeOff />
  }
  return (
    <div className="Messenger__title">
      <span>{children}</span>
      <button className="Messenger__sound-button" onClick={handleSoundButton} label="Włącz/Wyłącz dźwięk wiadomości">
        {volumenIcon()}
      </button>
    </div>
  )
}

export default Title;