import React, {useState, useEffect} from 'react';

import Messenger from '../../components/Messenger';
import {messageSoundStorage} from '../../../messengerLocalStorage';

function MessengerCon() {
  const MESSAGE_SOUND = messageSoundStorage.get() ? JSON.parse(messageSoundStorage.get()) : true;
  const [messageSound, setMessageSound] = useState(MESSAGE_SOUND);

  useEffect(() => {
    const messageSoundStorageAfterJSON = JSON.parse(messageSoundStorage.get());
    if (messageSoundStorageAfterJSON !== messageSound || messageSoundStorageAfterJSON === null) {
      messageSoundStorage.set(messageSound);
    }
  }, [messageSound]);

  const handleSoundButton = () => {
    setMessageSound(prev => (prev = !prev));
  };

  return <Messenger handleSoundButton={handleSoundButton} messageSound={messageSound} />;
}

export default MessengerCon;
