import React from 'react';

import SubmitButton from '../../../components/SubmitButton';
import Field from '../../../components/Field';
import Input from '../../../components/Input';
import FormMessage from '../../../components/FormMessage';
import showError from '../../../utils/showError';
import './styles.css';

function Form({handleChange, handleSubmit, formData, formErrors}) {
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
    <form onSubmit={handleSubmit} autoComplete="off">
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
      {formErrors.submit === 'not-complete' && (
        <FormMessage type="error">Musisz poprawnie uzupełnić formularz</FormMessage>
      )}
      {formErrors.submit === 'error' && (
        <FormMessage type="error">Wystąpił błąd. Spróbuj ponownie</FormMessage>
      )}
    </form>
  );
}

export default Form;
