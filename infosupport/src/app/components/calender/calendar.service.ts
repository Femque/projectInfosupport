import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Appointment} from "../../models/appointment";
import {HandleError} from "../../http-error-handler-service";

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
    return this.http.get<Appointment[]>(this.appointmentsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    console.log("creating appointment");
    const url = `${this.appointmentsUrl + "/create"}`
    return this.http.post<Appointment>(url, appointment)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAppointment(appointment: Appointment): Observable<Appointment> {
    console.log("deleting appointment");
    return this.http.post<Appointment>(this.appointmentsUrl + "/delete", appointment)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAppointment(appointment: Appointment): Observable<Appointment>{
    console.log("Updating appointment");
    return this.http.put<Appointment>( this.appointmentsUrl + '/update', appointment)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPatientsForGp(gp_user_id: number): Observable<string[]>{
    console.log("getting patients");
    return this.http.get<string[]>(this.appointmentsUrl + "/getPatients/" + gp_user_id)
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
