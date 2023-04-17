import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {ApiResponseModel, AppErrorModel, Performance} from "../models";
import {Stage} from "../models/stage.model";
import {PerformanceService} from "./performance.service";
import {ArtistService} from "./artist.service";
import {StageService} from "./stage.service";
import {VerbosePerformance} from "../models/verbosePerformance";
import {Artist} from "../models/artist.model";

@Injectable({
  providedIn: 'root'
})
export class VerbosePerformanceService {
  constructor(private performanceService: PerformanceService,
              private artistService: ArtistService, private stageService: StageService) {
  }

  performances?: Performance[];
  verbosePerformances?: VerbosePerformance[];
  error: AppErrorModel = {message: "verbosePerformanceService error"};
  errorFlag: boolean = false;
  getAllVerbosePerformances = (): Observable<ApiResponseModel> => {
    this.performanceService.getAllPerformances()
      .subscribe((response) => {
        const {data, error} = response;

        if (data) {
          this.performances = data as Performance[];
        }

        if (error) {
          console.log(error);
          this.errorFlag = true;
        }
      });

    this.performances?.forEach((performance: Performance) => {
      let verbosePerformance!: VerbosePerformance;

      verbosePerformance.date_time = performance.date_time;

      this.stageService.getStageById(performance.stage_id)
        .subscribe((response) => {
          const {data, error} = response;

          if (data) {
            verbosePerformance.stage = (data as Stage).name;
          }

          if (error) {
            console.log(error);
            this.errorFlag = true;
          }
        });

      this.artistService.getArtistById(performance.artist_id)
        .subscribe((response) => {
          const {data, error} = response;

          if (data) {
            verbosePerformance.artist = (data as Artist).name;
          }

          if (error) {
            console.log(error);
            this.errorFlag = true;
          }
        });

      this.verbosePerformances?.push(verbosePerformance);
    });

    return of({
      data: this.verbosePerformances ? (this.verbosePerformances as VerbosePerformance[]) : null,
      error: this.errorFlag ? this.error : null,
    });
  };


}
