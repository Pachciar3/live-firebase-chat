import React, {useState, useEffect} from 'react';

import {chatNickname} from '../../../messengerLocalStorage';
import Form from '../../components/Form';
import db from '../../../config.js';

function MessageForm() {
  const FORM_DATA = {
    nickname: chatNickname.get() || '',
    message: '',
  };
  const FORM_ERRORS = {
    nickname: false,
    message: false,
    submit: false,
  };
  const [formData, setFormData] = useState(FORM_DATA);
  const [formErrors, setFormErrors] = useState(FORM_ERRORS);

  useEffect(() => {
    if (formData.nickname) {
      chatNickname.set(formData.nickname);
    }
  }, [formData.nickname]);

  const handleChange = event => {
    setFormData({...formData, [event.target.name]: event.target.value});
    setFormErrors({
      ...formErrors,
      [event.target.name]: !event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newMessage = {
      user: formData.nickname,
      content: formData.message,
      datetime: Date.now(),
    };

    if (formData.message && formData.nickname) {
      setFormErrors({
        ...formErrors,
        submit: 'submited',
      });
      db.ref('/messages').push(newMessage, error => {
        if (error) {
          setFormErrors({
            ...FORM_ERRORS,
            submit: 'error',
          });
        } else {
          setFormErrors({
            ...FORM_ERRORS,
          });
          setFormData({
            ...formData,
            message: '',
          });
        }
      });
    } else {
      setFormErrors({
        message: !formData.message,
        nickname: !formData.nickname,
        submit: 'not-complete',
      });
    }
  };

  return (
    <Form
      formData={formData}
      formErrors={formErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default MessageForm;
