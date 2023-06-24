import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, from, mergeMap, Observable, of} from 'rxjs';
import { ApiResponseModel, RequestConfigModel } from '../models';
import {AuthService} from "@auth0/auth0-angular";

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getJWTToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.auth.getAccessTokenSilently().subscribe(
        (token) => {
          resolve(token);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  callExternalApi = (config: RequestConfigModel): Observable<ApiResponseModel> => {
    return this.auth.isAuthenticated$.pipe(
      mergeMap((isAuthenticated) => {
        if (isAuthenticated) {
          return from(this.getJWTToken()).pipe(
            mergeMap((token) => {
              config.headers['Authorization'] = `Bearer ${token}`;
              return this.http.request<unknown>(config.method, config.url, {
                headers: { ...config.headers },
              });
            })
          );
        } else {
          return this.http.request<unknown>(config.method, config.url, {
            headers: { ...config.headers },
          });
        }
      }),
      mergeMap((data) => {
        return of({
          data: data,
          error: null,
        });
      }),
      catchError((err) => {
        if (err.error && err.status) {
          return of({
            data: null,
            error: err.error,
          });
        }

        return of({
          data: null,
          error: {
            message: err.message,
          },
        });
      })
    );
  };
}
