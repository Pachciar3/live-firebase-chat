import React from 'react';

import Message from '../../components/Message';

function ListMessages({messages}) {
  return messages.map(message => (
    <Message key={`messenger-message-${message.id}`} message={message}></Message>
  ));
}

export default ListMessages;
