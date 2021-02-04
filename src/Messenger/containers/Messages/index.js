import React, {useState, useEffect} from 'react';

import Chat from '../../components/Chat';
import db from '../../../config.js';
import {chatNickname, messageSoundStorage} from '../../../localstorage';

function Messages() {
  const FORM_DATA = {
    nickname: chatNickname.get() || '',
    message: '',
  };
  const FORM_ERRORS = {
    nickname: false,
    message: false,
  };
  const MESSAGE_SOUND = messageSoundStorage.get() ? JSON.parse(messageSoundStorage.get()) : true;
  const [formData, setFormData] = useState(FORM_DATA);
  const [formErrors, setFormErrors] = useState(FORM_ERRORS);
  const [messageSound, setMessageSound] = useState(MESSAGE_SOUND);
  const [messages, setMessages] = useState([]);
  const [firstMessage, setFirstMessage] = useState(false); //REPAIR
  const [isLoaded, setIsLoaded] = useState(false);

  const messageAudio = new Audio('./sounds/message.mp3');

  useEffect(() => {
    const messageSoundStorageAfterJSON = JSON.parse(messageSoundStorage.get());
    if (messageSoundStorageAfterJSON !== messageSound || messageSoundStorageAfterJSON === null) {
      messageSoundStorage.set(messageSound);
    }
    db.ref('/messages').off('value');
    let firstLoading = 0;
    db.ref('/messages')
      .orderByKey()
      .limitToLast(20)
      .on('value', snapshot => {
        const fbMessages = snapshot.val();
        let messageCounter = 0;
        const convertedMessages = Object.entries(fbMessages || {}).map(([id, message]) => {
          if (messageCounter === 0) {
            setFirstMessage(id);
          }
          messageCounter++;
          return {
            ...message,
            id,
          };
        });

        setMessages(convertedMessages);
        messageSound && firstLoading !== 0 && messageAudio.play();
        firstLoading++;
        setIsLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageSound]);

  const handleSoundButton = () => {
    setMessageSound(prev => (prev = !prev));
  };

  const handleFormChange = event => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const newMessage = {
      user: formData.nickname,
      content: formData.message,
      datetime: Date.now(),
    };

    if (formData.message && formData.nickname) {
      chatNickname.set(formData.nickname);
      db.ref('/messages').push(newMessage);
      setFormErrors({
        FORM_ERRORS,
      });
      setFormData({
        ...formData,
        message: '',
      });
    } else {
      if (!formData.message) {
        setFormErrors({
          ...formErrors,
          message: true,
        });
      }
      if (!formData.nickname) {
        setFormErrors({
          ...formErrors,
          nickname: true,
        });
      }
    }
  };

  return (
    <Chat
      isLoaded={isLoaded}
      messages={messages}
      firstMessage={firstMessage}
      handleSoundButton={handleSoundButton}
      messageSound={messageSound}
      handleSubmit={handleFormSubmit}
      handleChange={handleFormChange}
      formData={formData}
      formErrors={formErrors}
    />
  );
}

export default Messages;
