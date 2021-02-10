export default function convertMessagesFromFb(snapshot) {
  const fbMessages = snapshot.val();
  const convertedMessages = Object.entries(fbMessages || {}).map(([id, message]) => {
    return {
      ...message,
      id,
    };
  });
  return convertedMessages;
}
