import {ExternalApiService} from "./external-api.service";
import {Injectable} from "@angular/core";
import {environment as env } from '../../../environments/environment';
import {mergeMap, Observable, of } from "rxjs";
import {ApiResponseModel, Performance, RequestConfigModel} from "../models";

@Injectable({
  providedIn: 'root'
})

export class PerformanceService {
  constructor(public externalApiService: ExternalApiService) {}

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
        const { data, error } = response;

        return of({
          data: data ? (data as Performance[]) : null,
          error,
        });
      })
    );
  };

  getFilteredPerformances = (date: Date | null, artist: string | null, stage: string | null): Observable<ApiResponseModel> => {
    const _date = date === null ? "0" : date.toISOString();
    const _artist = artist === null ? "0" : artist;
    const _stage = stage === null ? "0" : stage;
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/performances/filteredByName?time=${_date}&artist_id=${_artist}&stage_id=${_stage}`,
      method: 'GET',
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
