import {Time} from "@angular/common";

/**
 * Internally timeDate is always initialized with the value of the 1 of January 1970 this is to be ignored.
 * To outside use this class will return null if timeDate has values for get(Hour && Minute) = 0
 *
 * The festival is between 18 and 23 o'clock
 */
export class Filter {

  private timeInternal: Date = new Date()// Represents the time (Hours:Minutes)
  private dateInternal: Date = new Date()

  /**
   *
   * @param _dateDate Represents the date (Day, month, Year)
   * @param _timeDate Represents the time (Hours:Minutes)
   * @param _artist
   * @param _stage
   */
  constructor(private _dateDate: Date | null, private _timeDate: Date | null,
              private _artist: string | null, private _stage: string | null) {
    if (_timeDate) {
      this.timeInternal.setHours(_timeDate.getHours());
      this.timeInternal.setMinutes(_timeDate.getMinutes());
    }
    if (_dateDate) {
      this.dateInternal.setMonth(_dateDate.getMonth(), _dateDate.getDate());
    }
  }

  get timeDate(): Date | null {
    if (this.timeInternal.getHours() != 0) {
      return this.timeInternal;
    } else {
      return null;
    }
  }

  set timeDate(value: Date | null) {
    if (value) {
      this.timeInternal.setHours(value.getHours());
      this.timeInternal.setMinutes(value.getMinutes());
    } else {
      this.timeInternal.setHours(18);
      this.timeInternal.setMinutes(0);
    }
  }

  get dateDate(): Date | null {
    if (this.dateInternal.getDate() != 0) {
      return this.dateInternal;
    } else {
      return null;
    }
  }

  set dateDate(value: Date | null) {
    if (value) {
      this.dateInternal.setMonth(value.getMonth(), value.getDate());
    } else {
      this.dateInternal.setMonth(new Date().getMonth(), new Date().getDate());
    }
    this._dateDate = this.dateInternal;
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

  getTimeType(): Time | null {
    return (this.timeInternal.getHours() == 0) ? null : {
      hours: this.timeInternal.getHours(),
      minutes: this.timeInternal.getMinutes()
    }
  }

  setWithTimeType(time: Time | null) {
    if (time) {
      this.timeInternal.setHours(time.hours)
      this.timeInternal.setMinutes(time.minutes)
    } else {
      this.timeInternal.setHours(18)
      this.timeInternal.setMinutes(0)
    }
  }

  private static fromStringToDate(dateTimeString: string): Date {
    const [datePart, timePart] = dateTimeString.split(',_');

    const [day, month, year] = datePart.split('/').map(segment => parseInt(segment, 10));

    const [hour, minute] = timePart.split(':').map(segment => parseInt(segment, 10));

    var date = new Date();
    date.setFullYear(year, month - 1, day);
    date.setHours(hour, minute, 0, 0);
    return date;
  }

  toJSON(): string {
    return JSON.stringify({
      dateDate: this.dateInternal?.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(' ', '_'),
      timeDate: this.timeInternal?.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(' ', '_'),
      artist: this._artist,
      stage: this._stage
    });
  }

  static fromJSON(json: string): Filter {
    const { dateDate, timeDate, artist, stage } = JSON.parse(json);
    return new Filter(
      dateDate ? this.fromStringToDate(dateDate) : null,
      timeDate ? this.fromStringToDate(timeDate) : null,
      artist || null,
      stage || null
    );
  }

  toString(): string {
    return this.toJSON();
  }
}
