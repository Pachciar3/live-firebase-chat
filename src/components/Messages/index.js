import React, { useState, useEffect, useRef } from 'react';
import Message from '../Message';
import Spinner from 'react-spinner-material';
import db from '../../config';
import './styles.css';
import MessageForm from '../MessageForm';

function Messages() {
  const exampleNick = "Dawid";
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState(exampleNick);
  const [firstMessage, setFirstMessage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    db.ref('/messages').orderByKey().limitToLast(100).on('value', (snapshot) => {
      const fbMesssages = snapshot.val();
      let i = 0;
      const convertedMessages = Object.entries(fbMesssages || {}).map(
        ([id, message]) => {
          if (i === 0) {
            setFirstMessage(id);
          }
          i++
          return ({
            ...message,
            id
          })
        }
      );
      setMessages(convertedMessages);
      setIsLoaded(true);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageObj = {
      user: nickname,
      content: newMessage,
      datetime: Date.now()
    }
    if (newMessage && nickname) {
      db.ref('/messages').push(messageObj);
    }
    setNewMessage("")
  }
  const messagesEndRef = useRef(null);
  const messagesCon = useRef(null);
  const scrollToBottom = () => {
    if (isLoaded) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  useEffect(scrollToBottom, [messages, isLoaded]);
  function messagesAll() {
    const mystyle = {
      display: "flex",
      padding: "20px",
      justifyContent: "center",
    };
    if (isLoaded) {
      return (<div className="messages-con" ref={messagesCon} onScroll={e => setTimeout(() => { messagesCon.current.scrollTop < 5 && console.log(firstMessage) }, 200)}>
        <div className="foo" ></div>
        {
          messages.map(message => (
            <Message key={message.id} message={message}></Message>))
        }
        <div ref={messagesEndRef} ></div>
      </div >
      )
    } else {
      return (<div style={mystyle}><Spinner radius={50} color={"blueviolet"} stroke={4} visible={true} /></div>);
    }
  }
  return (
    <div className="Messages">
      <div className="title">Czat na żywo</div>
      {messagesAll()}
      <MessageForm nick={nickname} message={newMessage} handleSubmit={handleSubmit} handleNickChange={setNickname} handleContentChange={setNewMessage} />
    </div>
  );
}

export default Messages; 
