import React from 'react';

import './styles.scss';
import Spinner from 'react-spinner-material';
import MessageForm from '../MessageForm';
import Title from '../Title';
import MessagesList from '../../containers/MessagesList';

function Chat({ isLoaded, messages, firstMessage, formData, handleSubmit, handleChange, formErrors }) {

  function renderMessagesList() {
    if (isLoaded) {
      return <MessagesList messages={messages} firstMessage={firstMessage} isLoaded={isLoaded} />

    } else {
      return (<div className="Messenger__loader"><Spinner radius={50} color={"blueviolet"} stroke={4} visible={true} /></div>);
    }
  }

  return (
    <div className="Messenger">
      <Title>Czat na żywo</Title>
      {renderMessagesList()}
      <MessageForm formErrors={formErrors} formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} />
    </div>
  );
}

export default Chat; 
