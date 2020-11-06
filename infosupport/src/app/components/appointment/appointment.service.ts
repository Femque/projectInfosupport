import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Appointment} from "../../models/appointment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  createAppointmentUrl = 'http://localhost:8080/appointments/create' //Url to create appointment
  getAppointmentUrl = 'http://localhost:8080/appointments'


  constructor(private http: HttpClient) {
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    console.log("Creating appointment...");
    return this.http.post<Appointment>(this.createAppointmentUrl, appointment)
      .pipe(
        catchError(this.handleError)
      );  }

  //getting appointments
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.getAppointmentUrl)
  }

  // //deleting appointment
  // deleteAppointment(id: number) {
  //   console.log("deleting appointment");
  //   return this.http.delete(this.getAppointmentUrl + "/delete", id)
  // }

  deleteAppointment(id: number): Observable<{}> {
    const url = `${this.getAppointmentUrl + "/delete"}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url)
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
