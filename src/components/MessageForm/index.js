import React from "react";

import Button from "../Button";
import Field from "../Field";
import "./index.css";

function MessageForm({
  nick,
  message,
  handleSubmit,
  handleContentChange,
  handleNickChange,
}) {
  return (
    <div className="chat-footer">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <Field label="Nick:" id="nickname">
            <input
              id="nickname"
              className="field--input"
              value={nick}
              onChange={(event) => handleNickChange(event.target.value)}
              type="text"
              name="user"
            />
          </Field>
          <Field label="Treść:" id="content">
            <input
              className="field--input"
              type="text"
              id="content"
              name="content"
              value={message}
              onChange={(event) => handleContentChange(event.target.value)}
            />
          </Field>
        </div>
        <Button type="submit">Wyślij</Button>
      </form>
    </div>
  );
}

export default MessageForm;
