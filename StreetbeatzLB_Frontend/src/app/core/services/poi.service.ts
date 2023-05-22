import {ExternalApiService} from "./external-api.service";
import {Injectable} from "@angular/core";
import {environment as env } from '../../../environments/environment';
import {mergeMap, Observable, of } from "rxjs";
import {ApiResponseModel, RequestConfigModel} from "../models";
import {Poi} from "../models/poi.model";

@Injectable({
  providedIn: 'root'
})

export class PoiService {
  constructor(public externalApiService: ExternalApiService) {
  }
  getAllPois = ():Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/pois/all`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const { data, error } = response;

        return of ({
          data: data ? (data as Poi[]) : null,
          error
        });
      })
    );
  };

  getPoiByName = (poi_id: string): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/pois/poiByName?poi=${poi_id}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as Poi) : null,
          error,
        });
      })
    );
  };
}
