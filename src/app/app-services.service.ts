import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, ReplaySubject, TimeoutError } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";

import { environment } from '../environments/environment';

import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class AppServices {
  baseUrl = environment.domain;

  headers: HttpHeaders;

  constructor(private http: HttpClient, private _route: Router) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', "Bearer " + localStorage.getItem('wapro-erp-token'));
  }

  get(uri): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + uri)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getAuth(uri): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + uri, { 'headers': this.headers })
      .pipe(retry(1), catchError(this.errorHandl));
  }

  postAuth(uri, date): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + uri, date, { 'headers': this.headers })
      .pipe(retry(1), catchError(this.errorHandl));
  }

  post(uri, date): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + uri, date)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  deleteAuth(uri): Observable<any> {
    return this.http
      .delete<any>(this.baseUrl + uri, { 'headers': this.headers })
      .pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error) {
    let errorMessage = "";
    errorMessage = JSON.stringify({ error: error.status, message: (error.error!==null)?error.error.title:'Brak dostępu'});
    return throwError(errorMessage);
  }


}
