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

  voteForArtist = async (artist: string): Promise<void> => {
    console.log(artist);
    const re = new RegExp(' ', 'g');
    const formattedArtist = artist.replace(re, '_');
    console.log(encodeURIComponent(formattedArtist));
    const response = await fetch(`${env.api.serverUrl}/voting/vote?artist=` + encodeURIComponent(formattedArtist), {
      method: 'PUT',
    });
    console.log(response);
    const responseData = await response.text();
    console.log(responseData);
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
          data: data ? (data as boolean) : null,
          error,
        });
      })
    );
  }

  closeVoting = async (): Promise<void> => {
    const response = await fetch(`${env.api.serverUrl}/voting/closeVoting`, {
      method: 'PUT',
    });
    const responseData = await response.text();
  };

  openVoting = async (): Promise<void> => {
    const response = await fetch(`${env.api.serverUrl}/voting/openVoting`, {
      method: 'PUT',
    });
    const responseData = await response.text();
  };
}
