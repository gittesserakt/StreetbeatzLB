import { ExternalApiService } from "./external-api.service";
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { mergeMap, Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { ApiResponseModel, Performance, RequestConfigModel } from "../models";

@Injectable({
  providedIn: 'root'
})

export class PerformanceService {
  constructor(
    public externalApiService: ExternalApiService,
    private http: HttpClient,
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

  getFilteredPerformances = (date: Date | null, artist: string | null,
                             stage: string | null): Observable<ApiResponseModel> => {
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
      url: `${env.api.serverUrl}/performances/add?start_time=${start_time}&end_time=${end_time}&created_by=${created_by}&artist_id=${artist_id}&stage_id=${stage_id}`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      }
    };

    return this.externalApiService.callExternalApi(config).pipe(
      map((response) => {
        const { data } = response;
        return data as Performance;
      })
    );
  };

  editPerformance = (performance: Performance): Observable<ApiResponseModel> => {
    const performance_id = performance.performance_id;
    const start_time = performance.start_time;
    const end_time = performance.end_time;
    const artist_id = performance.artist_id;
    const stage_id = performance.stage_id;

    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/performances/edit?performance_id=${performance_id}&start_time=${start_time}&end_time=${end_time}&artist_id=${artist_id}&stage_id=${stage_id}`,
      method: 'PUT',
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
