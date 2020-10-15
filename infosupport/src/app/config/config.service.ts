import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

export interface Config {
  url: string;
}

@Injectable()
export class ConfigService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {
  }

  getConfig() {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        retry(3), //retry a failed request a maximum of 3 times
        catchError(this.handleError) //then handle error
      );
  }

  getConfig_1() {
    return this.http.get(this.configUrl);
  }

  getConfig_2() {
    // now returns an Observable of Config
    return this.http.get<Config>(this.configUrl);
  }

  getConfig_3() {
    return this.http.get<Config>(this.configUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }

  //Can be used for testing error handling
  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
