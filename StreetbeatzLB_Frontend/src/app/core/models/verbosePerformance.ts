export class VerbosePerformance {
  performance_id: number;
  start_time: string;
  end_time: string;
  artist: string;
  stage: string;

    constructor() {
      this.performance_id = 0;
      this.start_time = '';
      this.end_time = '';
      this.artist = '';
      this.stage = '';
    }
}
