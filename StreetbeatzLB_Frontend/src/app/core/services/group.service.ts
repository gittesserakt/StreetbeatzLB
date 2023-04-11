import {ExternalApiService} from "./external-api.service";
import {Injectable} from "@angular/core";
import {environment as env} from '../../../environments/environment';
import {mergeMap, Observable, of} from "rxjs";
import {ApiResponseModel, RequestConfigModel} from "../models";
import {Group} from "../models/group.model";

@Injectable({
  providedIn: 'root'
})

export class GroupService {
  constructor(public externalApiService: ExternalApiService) {
  }

  getGroupById = (group_id: number): Observable<ApiResponseModel> => {
    const config: RequestConfigModel = {
      url: `${env.api.serverUrl}/groups?group_id=${group_id}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    return this.externalApiService.callExternalApi(config).pipe(
      mergeMap((response) => {
        const {data, error} = response;

        return of({
          data: data ? (data as Group) : null,
          error,
        });
      })
    );
  };
}
