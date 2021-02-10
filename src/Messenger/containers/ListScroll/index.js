import React, {useEffect, useState, useRef} from 'react';

import ScrollLoader from '../../components/ScrollLoader';
import ListMessages from '../../components/ListMessages';
import ListBottomButton from '../../components/ListBottomButton';

function ListScroll({
  messages,
  isFirstLoaded,
  setWantScrollMessages,
  wantScrollMessages,
  haveScrollMessages,
  newMessageLoaded,
  newScrollMessagesLoaded,
  setNewMessageLoaded,
}) {
  const [prevHeight, setPrevHeight] = useState(0);
  const [goToBottom, setGoToBottom] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesListRef = useRef(null);

  useEffect(() => {
    if (isFirstLoaded) {
      messagesEndRef.current.scrollIntoView(true);
    }
  }, [isFirstLoaded]);

  useEffect(() => {
    const {scrollHeight, clientHeight, scrollTop} = messagesListRef.current;
    const scrollTopWithHeight = scrollTop + clientHeight;
    if (newMessageLoaded) {
      if (scrollTopWithHeight + 200 > scrollHeight) {
        messagesEndRef.current.scrollIntoView(true);
      }
      setNewMessageLoaded(false);
    }
  }, [newMessageLoaded, setNewMessageLoaded]);

  useEffect(() => {
    const list = messagesListRef.current;
    if (newScrollMessagesLoaded) {
      const scrollTo = list.scrollHeight - prevHeight;
      list.scrollTop = scrollTo;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newScrollMessagesLoaded]);

  function handleScroll() {
    const {scrollHeight, clientHeight, scrollTop} = messagesListRef.current;
    if (scrollTop < 1) {
      setPrevHeight(scrollHeight);
      setWantScrollMessages(true);
    }
    if (scrollTop + clientHeight <= scrollHeight - 400) {
      setGoToBottom(true);
    } else {
      setGoToBottom(false);
    }
  }

  return (
    <div className="Messenger__list" ref={messagesListRef} onScroll={handleScroll}>
      <ScrollLoader
        wantScrollMessages={wantScrollMessages}
        haveScrollMessages={haveScrollMessages}
      />
      <ListMessages messages={messages} />
      <ListBottomButton goToBottom={goToBottom} list={messagesListRef.current} />
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default ListScroll;
