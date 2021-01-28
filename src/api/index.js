import db from '../config';

export function getAllMessages() {
  db.ref('/messages').orderByKey().limitToLast(20).on('value', (snapshot) => {
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
}

export function addMessage() {
  db.ref('/messages').push(messageObj);
}