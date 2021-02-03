import React from 'react';

import convertDate from "../../../utils/converDate";
import renderText from "../../../utils/renderText";
import './styles.scss'

function Message({ message }) {
  let text = renderText(message.content);
  return (
    <div className="message">
      <div className="message__user">
        {message.user}
        <span className="message__time">
          {convertDate(message.datetime)}
        </span>
      </div>
      <div className="message__content">{text}</div>
    </div>
  )
}

export default Message;