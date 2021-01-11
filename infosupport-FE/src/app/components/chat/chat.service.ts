import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {Patient} from '../../models/patient';
import {Message} from '../../models/message';
import {catchError} from 'rxjs/operators';
import {GP} from '../../models/gp';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = environment.apiUrl

  getDoctorByUserId = this.url + '/patient/gp';
  chatUrl = this.url + '/chat';


  constructor(private http: HttpClient){
  }

  getPatientsForGp(gp_user_id: number): Observable<Patient[]>{
    console.log("getting patients");
    return this.http.get<Patient[]>(this.url + "/patient/gpChat/" + gp_user_id)
  }

  insertMessage(message: Message): Observable<Message>{
    console.log(message);
    return this.http.post<Message>(this.url + "/chat/message", message).
      pipe(catchError(ChatService.handleError))
  }

  getMessagesForChat(gp_user_id: number, patient_user_id: number): Observable<Message[]>{
    return this.http.get<Message[]>(this.url + "/chat/messagesForChat/" + gp_user_id + "/" + patient_user_id)
}

  getGPByPatientUserId(user_id: number) {
    const url = `${this.getDoctorByUserId}/${user_id}`;
    return this.http.get<number>(url)
  }

  getGp(user_id: number) {
    const url = this.url + "/doctor/user_id/" + user_id;
    return this.http.get<GP>(url)
  }

  getPatientById(id: number) {
    const url = this.url + `/patient/${id}`;
    return this.http.get<Patient>(url);
  }

  private static handleError(error: HttpErrorResponse) {
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
