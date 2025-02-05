import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const rootUrl = environment.auth_api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

    // GET 
    public get(url: string): Observable<any> {
      return this.http.get(`${rootUrl}/${url}`);
    }
    // POST 
    public post(url: string, payLoad: any): Observable<any> {
      return this.http.post(`${rootUrl}/${url}`, payLoad);
    }
    // PUT 
    public put(url: string, payLoad: any): Observable<any> {
      return this.http.put(`${rootUrl}/${url}`, payLoad);
    }
    // DELETE 
    public delete(url: string): Observable<any> {
      return this.http.delete(`${rootUrl}/${url}`);
    }

}
