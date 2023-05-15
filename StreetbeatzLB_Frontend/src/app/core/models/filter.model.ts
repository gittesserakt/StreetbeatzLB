import {Time} from "@angular/common";

/**
 * Internally timeDate is always initialized with the value of the 1 of January 1970 this is to be ignored.
 * To outside use this class will return null if timeDate has values for get(Hour && Minute) = 0
 *
 * The festival is between 18 and 23 o'clock
 */
export class Filter {

  private timeInternal: Date = new Date()// Represents the time (Hours:Minutes)

  /**
   *
   * @param _dateDate Represents the date (Day, month, Year)
   * @param _timeDate Represents the time (Hours:Minutes)
   * @param _artist
   * @param _stage
   */
  constructor(private _dateDate: Date | null, private _timeDate: Date | null, private _artist: string | null, private _stage: string | null) {
    this.timeInternal.setTime(0);
    if (_timeDate) {
      this.timeInternal.setHours(_timeDate.getHours());
      this.timeInternal.setMinutes(_timeDate.getMinutes());
    }
  }


  get timeDate(): Date | null{
    if(this.timeInternal.getHours() !=0){
      return this.timeInternal;
    }else{
      return null;
    }
  }

  set timeDate(value: Date | null) {
    if(value){
      this.timeInternal.setHours(value.getHours());
      this.timeInternal.setMinutes(value.getMinutes());
    }else{
      this.timeInternal.setHours(0);
      this.timeInternal.setMinutes(0);
    }
  }

  get dateDate():Date | null{
    return this._dateDate
  }
  set dateDate(value: Date | null) {
    this._dateDate = value;
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



  toString(): string {
    return "Date: " + (this._dateDate ? <string>this._dateDate?.toISOString() : "null") +
      "| Time: " + ((this.timeInternal.getHours() == 0) ? this.timeInternal.getHours() + ":" + this.timeInternal.getMinutes() : "null") +
      "| Artist: " + (this._artist ? this._artist! : "null") +
      "| Stage: " + (this._stage ? this._stage! : "null");
  }
}
