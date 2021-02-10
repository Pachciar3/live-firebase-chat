import React, {useEffect, useState} from 'react';

import Spinner from 'react-spinner-material';
import db from '../../../config.js';
import convertMessagesFromFb from '../../../utils/convertMessagesFromFb';
import ListScroll from '../ListScroll';
const messageAudio = new Audio('./sounds/message.mp3');

function ListCon({messageSound}) {
  const [messages, setMessages] = useState([]);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [haveScrollMessages, setHaveScrollMessages] = useState(true);
  const [wantScrollMessages, setWantScrollMessages] = useState(false);
  const [newMessageLoaded, setNewMessageLoaded] = useState(false);
  const [newScrollMessagesLoaded, setNewScrollMessagesLoaded] = useState(false);

  //First getting messages
  useEffect(() => {
    const onValueChange = snapshot => {
      const convertedMessages = convertMessagesFromFb(snapshot);
      setMessages(convertedMessages);
      setIsFirstLoaded(true);
    };
    db.ref('/messages').orderByKey().limitToLast(30).once('value', onValueChange);
  }, []);

  //Listener to new Messages
  useEffect(() => {
    if (isFirstLoaded) {
      const messagesClone = [...messages];
      const messagesCloneLength = messagesClone.length;
      const onValueChange = snapshot => {
        const convertedMessages = convertMessagesFromFb(snapshot);

        if (convertedMessages.length > 0 && messagesCloneLength > 0) {
          if (convertedMessages[0].id === messagesClone[messagesCloneLength - 1].id) {
            convertedMessages.splice(0, 1);
          }
        }
        if (convertedMessages.length > 0) {
          setMessages([...messages, ...convertedMessages]);
          setNewMessageLoaded(true);
          messageSound && messageAudio.play();
        }
      };

      if (messagesCloneLength > 0) {
        db.ref('/messages')
          .orderByKey()
          .startAt(messagesClone[messagesCloneLength - 1].id)
          .on('value', onValueChange);
      } else {
        //When don't have messages in database
        db.ref('/messages').orderByKey().on('value', onValueChange);
      }
      return () => db.ref('/messages').off('value', onValueChange);
    }
  }, [isFirstLoaded, messageSound, messages]);

  //Getting new messages when list is scrolled to top
  useEffect(() => {
    if (wantScrollMessages) {
      setNewScrollMessagesLoaded(false);
      const messagesClone = [...messages];
      const onValueChange = snapshot => {
        const convertedMessages = convertMessagesFromFb(snapshot);

        if (convertedMessages.length <= 1) {
          setHaveScrollMessages(false);
        } else {
          if (convertedMessages[convertedMessages.length - 1].id === messagesClone[0].id) {
            convertedMessages.splice(convertedMessages.length - 1, 1);
          }
          if (convertedMessages.length > 0) {
            setMessages([...convertedMessages, ...messages]);
            setNewScrollMessagesLoaded(true);
            setWantScrollMessages(false);
          }
        }
      };
      db.ref('/messages')
        .orderByKey()
        .endAt(messagesClone[0].id)
        .limitToLast(40)
        .once('value', onValueChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantScrollMessages]);

  if (isFirstLoaded) {
    return (
      <ListScroll
        messages={messages}
        isFirstLoaded={isFirstLoaded}
        setWantScrollMessages={setWantScrollMessages}
        wantScrollMessages={wantScrollMessages}
        haveScrollMessages={haveScrollMessages}
        newMessageLoaded={newMessageLoaded}
        newScrollMessagesLoaded={newScrollMessagesLoaded}
        setNewMessageLoaded={setNewMessageLoaded}
      />
    );
  } else {
    return (
      <div className="Messenger__loader">
        <Spinner radius={50} color={'blueviolet'} stroke={4} visible={true} />
      </div>
    );
  }
}

export default ListCon;
