import {Time} from "@angular/common";
import {min} from "rxjs";

/**
 * Date is never allowed to be null, because if a time can not be stored in a null field.
 * Therefore, date can never be null inside this Model.
 * If this happens the date will be set to 1970 and 0 Milisecounds through setTime(0).
 * If date is earlier than December 1972 date the month and day part of the Date are to be ignored
 * but the time can still be relevant.
 * Time is to be ignored if it is set to 00:00 o'clock.
 *
 * The festival is between 18 and 23 o'clock
 */
export class Filter {

  constructor(date: Date | null, private _artist: string | null, private _stage: string | null) {
    if (date) {
      this._date = date;
    } else {
      this._date = new Date();
      this._date.setTime(0);
    }
    this._artist = _artist;
    this._stage = _stage;
  }

  /**
   * If time should be deleted or set with value "null",
   * call this method with both parameters being 0.
   *
   * @param hours starting with 0 to 23
   * @param minutes starting with 0 to 59
   */
  setTime(hours: number, minutes: number) {
    this._date.setHours(hours);
    this._date.setMinutes(minutes);
  }

  getTime(): Time {
    return {hours: this._date.getHours(), minutes: this._date.getMinutes()}
  }

  get date(): Date | null {
      return this._date;
  }

  set date(value: Date | null) {
    const tmpH: number = this._date.getHours();
    const tmpM: number = this._date.getMinutes();
    if (value) {
      this._date = value;
    } else {
      this._date = new Date();
      this._date.setTime(0);
    }
    this._date.setHours(tmpH)
    this._date.setMinutes(tmpM)
  }

  get artist(): string | null {
    return this._artist;
  }

  set artist(value: string | null) {
    this._artist = value;
  }

  get stage(): string | null {
    return this._stage;
  }

  set stage(value: string | null) {
    this._stage = value;
  }

  private _date: Date;

  toString(): string {
    return "Date: " + (this._date ? <string>this._date?.toISOString() : "null") +
      "| Time: " + ((this._date.getHours() == 0) ? this._date.getHours() + ":" + this._date.getMinutes() : "null") +
      "| Artist: " + (this._artist ? this._artist! : "null") +
      "| Stage: " + (this._stage ? this._stage! : "null");
  }
}
