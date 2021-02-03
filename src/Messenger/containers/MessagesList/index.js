import React, { useEffect, useRef } from "react";
import Message from '../../components/Message';

function MessagesList({ messages, isLoaded, firstMessage }) {
  const messagesEndRef = useRef(null);
  const messagesCon = useRef(null);
  const scrollToBottom = () => {
    if (isLoaded) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  useEffect(scrollToBottom, [messages, isLoaded]);

  return (
    <div
      className="Messenger__list"
      ref={messagesCon}
      onScroll={e => setTimeout(() => { messagesCon.current.scrollTop < 5 && console.log(firstMessage) }, 200)}
    >
      <div className="Messenger__list-filler"></div>
      {
        messages.map(message => (
          <Message key={`messanger-message-${message.id}`} message={message}></Message>))
      }
      <div ref={messagesEndRef} ></div>
    </div >
  )
}

export default MessagesList;