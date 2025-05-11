export default function getCountdownDate(timeInSeconds = 600) {
  const date = new Date();
  date.setTime(date.getTime() + timeInSeconds * 60 * 10);
  return date;
}
