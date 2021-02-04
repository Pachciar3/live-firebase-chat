import React from 'react';

import SubmitButton from '../../../components/SubmitButton';
import Field from '../../../components/Field';
import Input from '../../../components/Input';
import FormMessage from '../../../components/FormMessage';
import showError from '../../../utils/showError';
import './styles.css';

function MessageForm({formData, formErrors, handleSubmit, handleChange}) {
  function prepareId(key) {
    return `messenger-form-${key}`;
  }
  function giveLoadedInfo(info) {
    if (info === 'submited') {
      return false;
    }
    return true;
  }
  return (
    <div className="Messenger__footer">
      <form onSubmit={handleSubmit}>
        <div className="form-con">
          <Field
            label="Nick:"
            id={prepareId('nickname')}
            error={showError(formErrors.nickname, 'Musisz podać nick')}
          >
            <Input
              type="text"
              id={prepareId('nickname')}
              name="nickname"
              value={formData.nickname}
              handleChange={handleChange}
            />
          </Field>
          <Field
            label="Treść wiadomości:"
            id={prepareId('message')}
            error={showError(formErrors.message, 'Musisz podać treść wiadomości')}
          >
            <Input
              type="text"
              id={prepareId('message')}
              name="message"
              value={formData.message}
              handleChange={handleChange}
            />
          </Field>
        </div>
        <SubmitButton type="submit" loaded={giveLoadedInfo(formErrors.submit)}>
          Wyślij
        </SubmitButton>
        {formErrors.submit === 'error' && (
          <FormMessage type="error">Wystąpił błąd. Spróbuj ponownie</FormMessage>
        )}
      </form>
    </div>
  );
}

export default MessageForm;
