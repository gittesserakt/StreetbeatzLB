import {ExternalApiService} from "./external-api.service";
import {Injectable} from "@angular/core";
import {environment as env } from '../../../environments/environment';
import {mergeMap, Observable, of } from "rxjs";
import {ApiResponseModel, RequestConfigModel} from "../models";
import {Stage} from "../models/stage.model";

@Injectable({
  providedIn: 'root'
})

export class StageService {
  constructor(public externalApiService: ExternalApiService) {}

  getStageById = (stage_id : number): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/stages/stageByID?stage_id=${stage_id}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;

        return of({
          data: data ? (data as Stage) : null,
          error,
        });
      })
    );
  };

  getIdByStage = (stage: string): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/stages/stageByName?stage=${stage}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as Stage) : null,
          error,
        });
      })
    );
  };

  getAllStages = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/stages/all`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;

        return of({
          data: data ? (data as Stage) : null,
          error,
        });
      })
    );
  };
}
