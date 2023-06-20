import { environment as env } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {catchError, forkJoin, from, map, mergeMap, Observable, of, switchMap} from "rxjs";
import { ExternalApiService } from "./external-api.service";
import { ApiResponseModel, AppErrorModel, RequestConfigModel } from "../models";
import { VerbosePerformance } from "../models/verbosePerformance";
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
    private artistService: ArtistService,
    private stageService: StageService,
    private http: HttpClient,
  ) {}

  error: AppErrorModel = {message: "verbosePerformanceService error"};
  errorFlag: boolean = false;

  getAllVerbosePerformances = (): Observable<ApiResponseModel> => {
    return this.getAllPerformances().pipe(
      switchMap((performancesResponse) => {
        const performances = performancesResponse.data as VerbosePerformance[];

        return [{ data: performances, error: this.errorFlag ? this.error : null }];
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
    return this.getFilteredPerformances(dateDate, timeDate, artist, stage)
      .pipe(switchMap((performancesResponse) => {
          const performances = performancesResponse.data as VerbosePerformance[];

          return [{ data: performances, error: this.errorFlag ? this.error : null }];
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

  getAllPerformances = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/verbose_performances/all`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as VerbosePerformance[]) : null,
          error,
        });
      })
    );
  };
  getFilteredPerformances = (dateDate: Date | null, timeDate: Date | null, artist: string | null, stage: string | null): Observable<ApiResponseModel> => {
    console.log("new log: " + timeDate);
    const _dateDate = (dateDate === null) ? "0" : dateDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(' ', '_');
    const _timeDate = (timeDate == null) ? "0" : timeDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(' ', '_');
    console.log("DateDate = " + _dateDate + "| TimeDate = " + _timeDate)
    const _artist = artist === null ? "0" : artist;
    const _stage = stage === null ? "0" : stage;
    //console.log(_dateDate + "|_|" + _timeDate + "|_|Artist: " +_artist + "|_|Stage: " + _stage)
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/verbose_performances/filteredByName?dateString=${_dateDate}&timeString=${_timeDate}&artistName=${_artist}&stageName=${_stage}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as Performance[]) : null,
          error,
        });
      })
    );
  };
}
