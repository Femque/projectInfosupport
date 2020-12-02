import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {Patient} from '../../models/patient';
import {Message} from '../../models/message';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatUrl = 'http://localhost:8080/chat' //Url to get all appointments


  constructor(private http: HttpClient){
  }

  getPatientsForGp(gp_user_id: number): Observable<Patient[]>{
    console.log("getting patients");
    return this.http.get<Patient[]>("http://localhost:8080/patient/gp/" + gp_user_id)
  }

  insertMessage(message: Message): Observable<Message>{
    console.log(message);
    return this.http.post<Message>(this.chatUrl + "/message", message).
      pipe(catchError(this.handleError))
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
