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
      url: `${env.api.serverUrl}/performances/all?id=0`,
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
