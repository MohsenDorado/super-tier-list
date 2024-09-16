import { getPersianNumbers } from "./getPersianNumbers";

function getPersianTime(gregorianDate: Date): string {
    const hours = gregorianDate.getHours();
    const minutes = gregorianDate.getMinutes();
    const seconds = gregorianDate.getSeconds();
    const time = `${getPersianNumbers(`${hours} : ${minutes}`)}`;
    return time;
  }
  export default getPersianTime