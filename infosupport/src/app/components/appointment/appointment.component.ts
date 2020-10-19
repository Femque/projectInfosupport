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

    // var endTime = new Date(this.appointmentTime.getTime() + 15*60000);
    let startDate = new Date(this.appointmentDate);

    var appointment = new Appointment(1, "Peter Vos", startDate, new Date(), "Huisartsenpost Zonnevelt")
    this.appointmentService.createAppointment(appointment)
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
