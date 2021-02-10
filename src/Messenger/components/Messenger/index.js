import React from 'react';

import Title from '../Title';
import FormCon from '../../containers/FormCon';
import ListCon from '../../containers/ListCon';
import './styles.scss';

function Messenger({handleSoundButton, messageSound}) {
  return (
    <div className="Messenger">
      <Title handleSoundButton={handleSoundButton} messageSound={messageSound}>
        Czat na żywo
      </Title>
      <div className="Messenger__content">
        <ListCon messageSound={messageSound} />
      </div>
      <div className="Messenger__footer">
        <FormCon />
      </div>
    </div>
  );
}

export default Messenger;
