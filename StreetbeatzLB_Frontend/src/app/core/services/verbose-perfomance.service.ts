import {Injectable} from "@angular/core";
import {catchError, forkJoin, map, Observable, of, switchMap} from "rxjs";
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

  error: AppErrorModel = {message: "verbosePerformanceService error"};
  errorFlag: boolean = false;

  getAllVerbosePerformances = (): Observable<ApiResponseModel> => {
    return this.performanceService.getAllPerformances().pipe(
      switchMap((performancesResponse) => {
        const performances = performancesResponse.data as Performance[];

        const verbosePerformances$ = performances.map((performance) => {
          const verbosePerformance = new VerbosePerformance();
          verbosePerformance.start_time = performance.start_time;
          verbosePerformance.end_time = performance.end_time;

          return forkJoin([
            this.stageService.getStageById(performance.stage_id).pipe(map(stageResponse => {
              const stageName = stageResponse.data ? (stageResponse.data as Stage).name : '';
              verbosePerformance.stage = stageName;
            })),
            this.artistService.getArtistById(performance.artist_id).pipe(map(artistResponse => {
              const artistName = artistResponse.data ? (artistResponse.data as Artist).name : '';
              verbosePerformance.artist = artistName;
            }))
          ]).pipe(map(() => verbosePerformance));
        });

        return forkJoin(verbosePerformances$).pipe(
          map((verbosePerformances) => ({
            data: verbosePerformances,
            error: this.errorFlag ? this.error : null,
          }))
        );
      }),
      catchError((error) => {
        console.log(error);
        return of({
          data: null,
          error: this.errorFlag ? this.error : null,
        });
      })
    );
  };

  getFilteredVerbosePerformances = (dateDate: Date | null, timeDate: Date | null, artist: string | null, stage: string | null): Observable<ApiResponseModel> => {
    return this.performanceService.getFilteredPerformances(dateDate, timeDate, artist, stage)
      .pipe(switchMap((performancesResponse) => {
          const performances = performancesResponse.data as Performance[];

          const verbosePerformances$ = performances.map((performance) => {
            const verbosePerformance = new VerbosePerformance();
            verbosePerformance.start_time = performance.start_time;
            verbosePerformance.end_time = performance.end_time;

            return forkJoin([
              this.stageService.getStageById(performance.stage_id).pipe(map(stageResponse => {
                verbosePerformance.stage = stageResponse.data ? (stageResponse.data as Stage).name : '';
              })),
              this.artistService.getArtistById(performance.artist_id).pipe(map(artistResponse => {
                verbosePerformance.artist = artistResponse.data ? (artistResponse.data as Artist).name : '';
              }))
            ]).pipe(map(() => verbosePerformance));
          });

          return forkJoin(verbosePerformances$).pipe(
            map((verbosePerformances) => ({
              data: verbosePerformances,
              error: this.errorFlag ? this.error : null,
            }))
          );
        }),
        catchError((error) => {
          console.log(error);
          return of({
            data: null,
            error: this.errorFlag ? this.error : null,
          });
        })
      );
  };

}
