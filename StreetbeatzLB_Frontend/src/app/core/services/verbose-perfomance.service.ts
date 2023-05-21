import { environment as env } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, forkJoin, map, mergeMap, Observable, of, switchMap } from "rxjs";
import { ExternalApiService } from "./external-api.service";
import { ApiResponseModel, AppErrorModel, Performance, RequestConfigModel } from "../models";
import { VerbosePerformance } from "../models/verbosePerformance";
import { PerformanceService } from "./performance.service";
import { ArtistService } from "./artist.service";
import { Artist } from "../models/artist.model";
import { StageService } from "./stage.service";
import { Stage } from "../models/stage.model";

@Injectable({
  providedIn: 'root'
})
export class VerbosePerformanceService {
  constructor(
    public externalApiService: ExternalApiService,
    private performanceService: PerformanceService,
    private artistService: ArtistService,
    private stageService: StageService,
    private http: HttpClient,
  ) {}

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
          verbosePerformance.performance_id = performance.performance_id;

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

  getFilteredVerbosePerformances = (date: Date | null, artist: string | null, stage: string | null): Observable<ApiResponseModel> => {
    return this.performanceService.getFilteredPerformances(date, artist, stage)
      .pipe(switchMap((performancesResponse) => {
        const performances = performancesResponse.data as Performance[];

        const verbosePerformances$ = performances.map((performance) => {
          const verbosePerformance = new VerbosePerformance();
          verbosePerformance.start_time = performance.start_time;
          verbosePerformance.end_time = performance.end_time;
          verbosePerformance.performance_id = performance.performance_id;

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

  deletePerformance = (performanceID: number): Observable<void> => {
    const url = `${env.api.serverUrl}/performances/delete?performanceID=${performanceID}`;

    return this.http.delete<void>(url);
  };

  addPerformance = (startTime_date: Date, userId: string, artist_id: number, stage_id: number): Observable<ApiResponseModel> => {
    const startTime = new Date(startTime_date.getTime() + (120 * 60 * 1000)).toISOString().slice(0, 19);
    const endTime = new Date(startTime_date.getTime() + (150 * 60 * 1000)).toISOString().slice(0, 19);
    const created_by = userId.replace("auth0|", "");
    //"auth0|" is removed when reading the ID, leads to problems.

      const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/performances/add?start_time=${startTime}&end_time=${endTime}&created_by=${created_by}&artist_id=${artist_id}&stage_id=${stage_id}`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      }
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;

        return of({
          data: data ? (data as Performance[]) : null,
          error,
        });
      })
    );
  };

  editPerformance = (performance_id: number, startTime_date: Date, artist_id: number, stage_id: number): Observable<ApiResponseModel> => {
    const startTime = new Date(startTime_date.getTime() + (120 * 60 * 1000)).toISOString().slice(0, 19);
    const endTime = new Date(startTime_date.getTime() + (150 * 60 * 1000)).toISOString().slice(0, 19);

    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/performances/edit?performance_id=${performance_id}&start_time=${startTime}&end_time=${endTime}&artist_id=${artist_id}&stage_id=${stage_id}`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;

        return of({
          data: data ? (data as Performance[]) : null,
          error,
        });
      })
    );
  };
}
