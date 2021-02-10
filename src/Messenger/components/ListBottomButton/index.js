import React from 'react';

import ArrowDown from '../../../icons/ArrowDown';

function ListBottomButton({goToBottom, list}) {
  function scrollToBottom() {
    list.scrollTop = list.scrollHeight;
  }

  if (goToBottom) {
    return (
      <button onClick={scrollToBottom} className="Messenger__go-to-bottom" title="Przewiń w dół">
        <ArrowDown />
      </button>
    );
  }
  return null;
}

export default ListBottomButton;
