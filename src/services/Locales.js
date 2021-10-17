/*
import DateTimes from '../services/DateTimes.js';

  getIntlDateTime() {
    const dt = new DateTimes();
    const ystring = dt.getCurrentDateTimeIntl();
    return ystring;
  }
  getYear() {
    const dt = new DateTimes();
    const ystring = dt.setCopyDate(this.startdate);
    return ystring;
  },
*/

import { Quasar } from "quasar";

export default class Locales {

  getLocale() {
    let locale = Quasar.lang.getLocale();
    return locale.replace(/(-.*)/, "");
  }

}
