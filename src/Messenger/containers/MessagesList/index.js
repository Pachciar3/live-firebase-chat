import React, {useEffect, useRef} from 'react';

import Message from '../../components/Message';

function MessagesList({messages, isLoaded, firstMessage}) {
  const messagesEndRef = useRef(null);
  const messagesListRef = useRef(null);
  const scrollToBottom = () => {
    if (isLoaded) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };
  useEffect(scrollToBottom, [messages, isLoaded]);

  return (
    <div
      className="Messenger__list"
      ref={messagesListRef}
      onScroll={
        e =>
          setTimeout(() => {
            messagesListRef.current.scrollTop < 5 && console.log(firstMessage);
          }, 200)
        //REPAIR THIS
      }
    >
      <div className="Messenger__list-filler"></div>
      {messages.map(message => (
        <Message key={`messenger-message-${message.id}`} message={message}></Message>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default MessagesList;
