import React from "react";

import Button from "../../../components/Button";
import Field from "../../../components/Field";
import Input from "../../../components/Input";
import "./styles.css";

function MessageForm({
  formData,
  formErrors,
  handleSubmit,
  handleChange,
}) {

  function prepareId(key) {
    return `messanger-form-${key}`
  }

  function showError(error, errorText) {
    if (error) {
      return errorText
    } else {
      return false
    }
  }

  return (
    <div className="Messenger__footer">
      <form onSubmit={handleSubmit}>
        <div className="form-con">
          <Field label="Nick:" id={prepareId("nickname")} error={showError(formErrors.nickname, "Musisz podać nick")}>
            <Input
              type="text"
              id={prepareId("nickname")}
              name="nickname"
              value={formData.nickname}
              handleChange={handleChange}
            />
          </Field>
          <Field label="Treść wiadomości:" id={prepareId("message")} error={showError(formErrors.message, "Musisz podać treść wiadomości")}>
            <Input
              type="text"
              id={prepareId("message")}
              name="message"
              value={formData.message}
              handleChange={handleChange}
            />
          </Field>
        </div>
        <Button type="submit">Wyślij</Button>
      </form>
    </div>
  );
}

export default MessageForm;
