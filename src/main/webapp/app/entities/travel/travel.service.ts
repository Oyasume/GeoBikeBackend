import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITravel } from 'app/shared/model/travel.model';

type EntityResponseType = HttpResponse<ITravel>;
type EntityArrayResponseType = HttpResponse<ITravel[]>;

@Injectable({ providedIn: 'root' })
export class TravelService {
  public resourceUrl = SERVER_API_URL + 'api/travels';

  constructor(protected http: HttpClient) {}

  create(travel: ITravel): Observable<EntityResponseType> {
    return this.http.post<ITravel>(this.resourceUrl, travel, { observe: 'response' });
  }

  update(travel: ITravel): Observable<EntityResponseType> {
    return this.http.put<ITravel>(this.resourceUrl, travel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITravel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITravel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
