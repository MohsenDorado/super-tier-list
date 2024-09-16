import jalaali from "jalaali-js";
import { getPersianNumbers } from "./getPersianNumbers";

export default function getPersianDate(gregorianDate: Date, nintyDayAdd: boolean): string {
    let modifiedDate = new Date(gregorianDate);

    modifiedDate.setDate(modifiedDate.getDate() + 90);
    // console.log(gregorianDate);
    const { jy, jm, jd } = jalaali.toJalaali(
      nintyDayAdd ? modifiedDate : gregorianDate
    );
    const persianDate = `${getPersianNumbers(
      jy.toString()
    )} / ${getPersianNumbers(
      jm.toString()
    )} / ${getPersianNumbers(jd.toString())}`;

    return persianDate;
  }
  