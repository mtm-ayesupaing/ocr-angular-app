import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private http: HttpClient,
  ) { }

  createRestaurant(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}restaurants`, body);
  }

  getRestaurants(sort: string = 'id'): Observable<any> {
    return this.http.get(environment.apiEndpoint
      + `restaurants?`
      + `_sort=${sort}:DESC`
    );
  }

  updateRestaurant(id: number, body: any): Observable<any> {
    return this.http.put(environment.apiEndpoint + `restaurants/${id}`, body);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(`${environment.apiEndpoint}restaurants/${id}`);
  }
}
