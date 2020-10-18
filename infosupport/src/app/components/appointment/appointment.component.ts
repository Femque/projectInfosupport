import { Component, OnInit } from '@angular/core';
import {AppointmentService} from "./appointment.service";
import {Appointment} from "../../models/appointment";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public errorMessage: string;
  public successMessage: string;
  public appointmentDate: string;
  public appointmentTime: string;
  public appointmentMessage: string;
  public message: string;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }

  createAppointment() {
    this.errorMessage = "";
    this.successMessage = "";
    this.appointmentService.createAppointment(this.appointmentDate, this.appointmentTime, this.appointmentMessage)
      .subscribe((createdAppointment: Appointment) => {
        this.appointmentDate = "";
        this.appointmentTime = "";
        this.appointmentMessage = "";
        const appointmentDate = new Date(createdAppointment.startTime).toDateString();
        this.successMessage = `Uw afspraak is succesvol geboekt op ${appointmentDate}`;
        },
        (error: ErrorEvent) => {
        this.errorMessage = error.error.message;
        });
  }

}
