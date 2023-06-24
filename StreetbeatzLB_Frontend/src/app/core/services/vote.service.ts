import {Injectable} from "@angular/core";
import {ExternalApiService} from "./external-api.service";
import {mergeMap, Observable, of} from "rxjs";
import {ApiResponseModel, RequestConfigModel} from "../models";
import {environment as env} from '../../../environments/environment';
import {Artist} from "../models/artist.model";

@Injectable({
  providedIn: 'root'
})

export class VoteService {
  constructor(public externalApiService: ExternalApiService) {
  }

  voteForArtist = (artist: string): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/voting/vote`,
      method: `PUT`,
      headers: {
        'content-type': 'application/json',
      },
      body: {
        'artist': artist,
      }
    }

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data,error} = response;

        return of({
          data: data ? (data as Artist): null,
          error,
        });
      })
    );
  };

  getVoteById = (artist_id: number): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/voting/getVoteById?artist_id=${artist_id}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as Artist) : null,
          error,
        });
      })
    );
  };

  getVoteStatus = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/voting/voteStatus`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data !== null ? (data as boolean) : null,
          error,
        });
      })
    );
  }

  closeVoting = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/voting/closeVoting`,
      method: `PUT`,
      headers: {
        'content-type': 'application/json',
      },
    }

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data,error} = response;

        return of({
          data: null,
          error,
        });
      })
    );
  };

  openVoting = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/voting/openVoting`,
      method: `PUT`,
      headers: {
        'content-type': 'application/json',
      },
    }

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: null,
          error,
        });
      })
    );
  }
}
