import { ExternalApiService } from "./external-api.service";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { mergeMap, Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { ApiResponseModel, Performance, RequestConfigModel } from "../models";
import { ArtistService} from "./artist.service";
import { StageService } from "./stage.service";

@Injectable({
  providedIn: 'root'
})

export class PerformanceService {
  constructor(
    public externalApiService: ExternalApiService,
    private http: HttpClient,
    private artistService: ArtistService,
    private stageService: StageService
  ) {}

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

  deletePerformance = (performanceID: number): Observable<void> => {
    const url = `${env.api.serverUrl}/performances/delete?performanceID=${performanceID}`;

    return this.http.delete<void>(url);
  };

  addPerformance = (performance: Performance): Observable<Performance> => {
    const start_time = performance.start_time;
    const end_time = performance.end_time;
    const created_by = performance.created_by;
    const artist_id = performance.artist_id;
    const stage_id = performance.stage_id;

    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/performances/add`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: {
        start_time,
        end_time,
        created_by,
        artist_id,
        stage_id,
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      map((response) => {
        const { data } = response;
        return data as Performance;
      })
    );
  };

  editPerformance = (performanceId: number, startTime: string | null, endTime: string | null, artist: string | null,
                     stage: string | null): Observable<Performance> => {
    const url = `${env.api.serverUrl}/performances/edit`;

    const artistId = artist === null ? null : this.artistService.getIdByArtist(artist)  //TODO???
    const stageId = stage === null ? null : this.stageService.getIdByStage(stage)

    const body = {
      performance_id: performanceId,
      start_time: startTime,
      end_time: endTime,
      artist_id: artistId,
      stage_id: stageId
    };

    return this.http.put<Performance>(url, body);
  };
}
