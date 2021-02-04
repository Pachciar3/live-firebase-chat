import React from 'react';

import convertDate from '../../../utils/convertDate';
import renderLinks from '../../../utils/renderLinks';
import './styles.scss';

function Message({message}) {
  let text = renderLinks(message.content);
  return (
    <div className="message">
      <div className="message__user">
        {message.user}
        <span className="message__time">{convertDate(message.datetime)}</span>
      </div>
      <div className="message__content">{text}</div>
    </div>
  );
}

export default Message;
