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

  createAppointment(appointment: Appointment): Observable<Appointment> {
    console.log("Creating appointment...");
    return this.http.post<Appointment>(environment.apiUrl + "/appointments/create", appointment)
      .pipe(
        catchError(this.handleError)
      );  }

  //getting appointments
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(environment.apiUrl + "/appointments")
  }

  //getting appointment
  getAppointmentsById(): Observable<Appointment[]> {
    const url = `${environment.apiUrl}/appointments/${sessionStorage.getItem('user_id')}`; // DELETE api/heroes/42
    return this.http.get<Appointment[]>(url)
  }

  // //deleting appointment
  // deleteAppointment(id: number) {
  //   console.log("deleting appointment");
  //   return this.http.delete(this.getAppointmentUrl + "/delete", id)
  // }

  deleteAppointment(id: number): Observable<{}> {
    const url = `${environment.apiUrl + "/appointments" + "/delete"}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url)
  }

  getGPUSerId(user_id: number){
    const url = `${environment.apiUrl + "/appointments" + "/patient/gp"}/${user_id}`
    return this.http.get<number>(url)
  }

  getFullName() {
    const url = `${environment.apiUrl}/user/fullname/${sessionStorage.getItem('user_id')}`;
    return this.http.get<string>(url);
  }

  getFullNameBig(bigCode: number) {
    const url = `${environment.apiUrl}/user/fullname/${bigCode}`;
    return this.http.get<string>(url);
  }

  getBigCode(user_id: number){
    const url = `${environment.apiUrl + "/appointments" + "/big_code"}/${user_id}`
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
