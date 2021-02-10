import React from 'react';

import Message from '../../components/Message';
import FormMessage from '../../../components/FormMessage';

function ListMessages({messages}) {
  if (messages.length) {
    return messages.map(message => (
      <Message key={`messenger-message-${message.id}`} message={message}></Message>
    ));
  }
  return <FormMessage type="warning">Brak wiadomości</FormMessage>;
}

export default ListMessages;
