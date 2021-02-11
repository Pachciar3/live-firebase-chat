import React from 'react';

import convertDate from '../../../utils/convertDate';
import renderLinks from '../../../utils/renderLinks';
import './styles.scss';

function Message({message}) {
  const {content, userColor, user, datetime} = message;
  const text = renderLinks(content);
  return (
    <div className="message" style={{borderLeft: `5px solid ${userColor || '#000'}`}}>
      <div className="message__user">
        {user}
        <span className="message__time">{convertDate(datetime)}</span>
      </div>
      <div className="message__content">{text}</div>
    </div>
  );
}

export default React.memo(Message);
