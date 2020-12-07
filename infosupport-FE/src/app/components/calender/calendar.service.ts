import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Appointment} from "../../models/appointment";
import {HandleError} from "../../http-error-handler-service";
import {environment} from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  })
};

@Injectable()
export class CalendarService {
  appointmentsUrl = 'http://localhost:8080/appointments' //Url to get all appointments

  constructor(
    private http: HttpClient
  ) {
  }

  getAppointments(): Observable<Appointment[]> {
    console.log("getting appointments ")
    return this.http.get<Appointment[]>(environment.apiUrl + "/appointments")
      .pipe(
        catchError(this.handleError)
      );
  }

  getAppointmentsGp(big_code : number): Observable<Appointment[]> {
    console.log("getting appointments ")
    return this.http.get<Appointment[]>(environment.apiUrl + "/appointments" + "/gp/" + big_code)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBigCode(user_id: number) {
    console.log(user_id);
    const url = `${environment.apiUrl}/doctor/big_code/${user_id}`;
    return this.http.get<number>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    const url = `${environment.apiUrl + "/appointments" + "/create"}`
    return this.http.post<Appointment>(url, appointment)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAppointment(id: number): Observable<{}> {
    const url = `${environment.apiUrl + "/appointments" + "/delete"}/${id}`;
    return this.http.delete(url)
  }

  updateAppointment(appointment: Appointment): Observable<Appointment>{
    return this.http.put<Appointment>( environment.apiUrl + "/appointments" + '/update', appointment)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPatientsForGp(gp_user_id: number): Observable<string[]>{
    return this.http.get<string[]>(environment.apiUrl + "/appointments" + "/getPatients/" + gp_user_id)
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
