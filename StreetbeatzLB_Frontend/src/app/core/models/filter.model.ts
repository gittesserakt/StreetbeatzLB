import {Time} from "@angular/common";

export class Filter {
  date: Date | null;
  time: Time | null;
  artist: string | null;
  stage: string | null;

  constructor(date: Date | null, time: Time | null, artist: string | null, stage: string | null) {
    this.date = date;
    this.time = time;
    this.artist = artist;
    this.stage = stage;
  }

  toString(): string {
    return "Date: " + (this.date ? this.date!.toISOString() : "null") +
      "| Time: " + (this.time ? this.time.hours +
        ":" + this.time.minutes : "null") +
      "| Artist: " + ((this.artist?.length == 0) ? this.artist! : "null") +
      "| Stage: " + ((this.stage?.length == 0) ? this.stage! : "null");
  }
}
