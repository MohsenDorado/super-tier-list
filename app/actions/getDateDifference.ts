export default function getDateDifference(date: Date) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return dayDifference;
}
