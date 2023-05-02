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
}
