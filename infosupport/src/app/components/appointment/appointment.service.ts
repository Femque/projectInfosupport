import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
    console.log("Post request");
    console.log(appointment);
    return this.http.post<Appointment>(this.createAppointmentUrl, {appointment})
  }

  //getting appointments
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.getAppointmentUrl)
  }

}
