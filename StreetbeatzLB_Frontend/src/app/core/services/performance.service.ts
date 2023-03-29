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


}
