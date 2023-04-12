import {ExternalApiService} from "./external-api.service";
import {Injectable} from "@angular/core";
import {environment as env} from '../../../environments/environment';
import {mergeMap, Observable, of} from "rxjs";
import {ApiResponseModel, RequestConfigModel} from "../models";
import {Artist} from "../models/artist.model";

@Injectable({
  providedIn: 'root'
})

export class ArtistService {
  constructor(public externalApiService: ExternalApiService) {
  }

  getArtistById = (artist_id: number): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/artists/artistByID?artistID=${artist_id}`,
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
