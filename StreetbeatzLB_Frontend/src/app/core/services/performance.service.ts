import {ExternalApiService} from "./external-api.service";
import {Injectable} from "@angular/core";
import {environment as env} from '../../../environments/environment';
import {mergeMap, Observable, of} from "rxjs";
import {ApiResponseModel, Performance, RequestConfigModel} from "../models";
import {ConsoleLogger} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})

export class PerformanceService {
  constructor(public externalApiService: ExternalApiService) {
  }

  getAllPerformances = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/performances/all`,
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

  getFilteredPerformances = (dateDate: Date | null, timeDate: Date | null, artist: string | null, stage: string | null): Observable<ApiResponseModel> => {
    const _dateDate = (dateDate === null) ? "0" : dateDate.toISOString();
    const _timeDate = (timeDate === null) ? "0" : timeDate.toISOString();
    console.log("DateDate = " + _dateDate + "| TimeDate = " + _timeDate)
    const _artist = artist === null ? "0" : artist;
    const _stage = stage === null ? "0" : stage;
    // console.log(_dateDate + "|_|" + _timeDate + "|_|Artist: " +_artist + "|_|Stage: " + _stage)
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/performances/filteredByName?dateString=${_dateDate}&timeString=${_timeDate}&artistName=${_artist}&stageName=${_stage}`,
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
