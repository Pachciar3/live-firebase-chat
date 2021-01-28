export default function convertDate(timestamp) {
  function prepareTime(time) {
    return `${time > 9 ? time : '0' + time}`
  }
  const datetime = new Date(timestamp);
  return `${prepareTime(datetime.getHours())}:${prepareTime(datetime.getMinutes())}:${prepareTime(datetime.getSeconds())}`
}