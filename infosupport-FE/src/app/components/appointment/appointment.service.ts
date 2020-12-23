import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Appointment} from "../../models/appointment";
import {catchError} from "rxjs/operators";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {
  }

  url = "http://localhost:8080"

  createAppointment(appointment: Appointment): Observable<Appointment> {
    console.log("Creating appointment...");
    return this.http.post<Appointment>(this.url + "/appointments/create", appointment)
      .pipe(
        catchError(this.handleError)
      );
  }

  //getting appointments
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.url + "/appointments")
  }

  //getting appointment
  getAppointmentsById(boolAppointmentGP): Observable<Appointment[]> {
    if (boolAppointmentGP == true) {
      const url = `${this.url}/appointments/gp/${sessionStorage.getItem('user_id')}`;
      return this.http.get<Appointment[]>(url)
    } else {
      const url = `${this.url}/appointments/${sessionStorage.getItem('user_id')}`;
      return this.http.get<Appointment[]>(url)
    }
  }

  deleteAppointment(id: number): Observable<{}> {
    const url = `${this.url + "/appointments" + "/delete"}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url)
  }

  getGPUSerId(user_id: number) {
    const url = `${this.url + "/appointments" + "/patient/gp"}/${user_id}`
    return this.http.get<number>(url)
  }

  getFullName() {
    const url = `${this.url}/user/fullname/${sessionStorage.getItem('user_id')}`;
    return this.http.get<string>(url);
  }

  getFullNameBig(bigCode: number) {
    const url = `${this.url}/user/fullname/${bigCode}`;
    return this.http.get<string>(url);
  }

  getBigCode(user_id: number) {
    const url = `${this.url + "/appointments" + "/big_code"}/${user_id}`
    return this.http.get<number>(url)
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
