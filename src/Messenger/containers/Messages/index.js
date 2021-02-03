import React, { useState, useEffect } from 'react';

import db from '../../../config.js';
import Chat from '../../components/Chat';
import { chatNickname } from "../../../localstorage"

function Messages() {
  const FORM_DATA = {
    nickname: chatNickname.get() || "",
    message: ""
  };
  const FORM_ERRORS = {
    nickname: false,
    message: false
  };
  const [formData, setFormData] = useState(FORM_DATA);
  const [formErrors, setFormErrors] = useState(FORM_ERRORS);
  const [messages, setMessages] = useState([]);
  const [firstMessage, setFirstMessage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const messageAudio = new Audio("./sounds/message.mp3");
    let firstLoading = 0
    db.ref('/messages').orderByKey().limitToLast(20).on('value', (snapshot) => {
      const fbMesssages = snapshot.val();
      let i = 0;
      const convertedMessages = Object.entries(fbMesssages || {}).map(
        ([id, message]) => {
          if (i === 0) {
            setFirstMessage(id);
          }
          i++
          return ({
            ...message,
            id
          })
        }
      );
      setMessages(convertedMessages);
      firstLoading !== 0 && messageAudio.play();
      firstLoading++;
      setIsLoaded(true);
    });
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageObj = {
      user: formData.nickname,
      content: formData.message,
      datetime: Date.now()
    }

    if (formData.message && formData.nickname) {
      chatNickname.set(formData.nickname);
      db.ref('/messages').push(messageObj);
      setFormErrors({
        FORM_ERRORS
      });
      setFormData({
        ...formData,
        message: ""
      });
    } else {
      if (!formData.message) {
        setFormErrors({
          ...formErrors,
          message: true
        })
      }
      if (!formData.nickname) {
        setFormErrors({
          ...formErrors,
          nickname: true
        })
      }
    }
  }


  return (
    <Chat
      isLoaded={isLoaded}
      messages={messages}
      firstMessage={firstMessage}
      formData={formData}
      formErrors={formErrors}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}

export default Messages; 
