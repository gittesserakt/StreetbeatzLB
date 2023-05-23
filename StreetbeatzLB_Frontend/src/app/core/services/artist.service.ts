import { ExternalApiService } from "./external-api.service";
import { environment as env } from '../../../environments/environment';
import { mergeMap, Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiResponseModel, RequestConfigModel } from "../models";
import { Artist } from "../models/artist.model";

@Injectable({
  providedIn: 'root'
})

export class ArtistService {
  constructor(public externalApiService: ExternalApiService) {}

  getArtistById = (artist_id: number): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/artists/artistByID?artist_id=${artist_id}`,
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

  getIdByArtist = (artist: string): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/artists/artistByName?artist=${artist}`,
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

  getArtistByName = (artist_id: string): Observable<ApiResponseModel> => {
    console.log(artist_id)
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/artists/artistByName?artist=${artist_id}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        console.log(data as Artist)
        return of({
          data: data ? (data as Artist) : null,
          error,
        });
      })
    );
  };

  getAllArtists = (): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/artists/all`,
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
}
