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

export default class CopyDate {

  setCopyDate(year) {
    const dt = new Date();
    let fYear = dt.getFullYear();
    let dateString = '';
    year === fYear.toString() ? (dateString = year) : (dateString = `${year}-${fYear.toString()}`);
    return dateString;
  }

  getCurrentDateTimeIntl() {
    const browserLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
    const intlDateTime = new Intl.DateTimeFormat(browserLocale, {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});

    return intlDateTime.format(new Date);
  }

}
