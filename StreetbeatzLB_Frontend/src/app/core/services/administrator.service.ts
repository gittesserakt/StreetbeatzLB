import { ExternalApiService } from "./external-api.service";
import { environment as env } from '../../../environments/environment';
import { mergeMap, Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiResponseModel, RequestConfigModel } from "../models";
import { Artist } from "../models/artist.model";
import {Administrator} from "../models/administrator.model";

@Injectable({
  providedIn: 'root'
})

export class AdministratorService {
  constructor(public externalApiService: ExternalApiService) {}

  getAllAdministrators = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/administrators/`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as Administrator[]) : null,
          error,
        });
      })
    );
  }

  getAdministratorByIdentifier = (identifier: string): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/administrators/${identifier}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as Administrator) : null,
          error,
        });
      })
    );
  }

  addAdministrator = (administrator: Administrator): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/administrators/add`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: administrator,
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as Administrator) : null,
          error,
        });
      })
    );
  }

  deleteAdministrator = (identifier: string): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/administrators/${identifier}`,
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as Administrator) : null,
          error,
        });
      })
    );
  }

  // check if the logged-in user is in the administrators table and if not add them
  checkAdministrator = (administrator: Administrator): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/administrators/check`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: administrator,
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as Administrator) : null,
          error,
        });
      })
    );
  }
}
