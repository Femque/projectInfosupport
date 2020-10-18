import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "../../models/appointment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  createAppointmentUrl = 'http://localhost:8080/appointments/create' //Url to create appointment

  constructor(private http: HttpClient) { }

  createAppointment(appointmentDate: string, appointmentTime: string, appointmentMessage: string): Observable<Appointment> {
    return this.http.post<Appointment>(this.createAppointmentUrl, {appointmentDate, appointmentTime, appointmentMessage})
  }
}
