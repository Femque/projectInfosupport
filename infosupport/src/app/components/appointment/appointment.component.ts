import {Component, OnInit, ViewChild} from '@angular/core';
import {AppointmentService} from "./appointment.service";
import {Appointment} from "../../models/appointment";
import DateTimeFormat = Intl.DateTimeFormat;
import {FormBuilder} from "@angular/forms";
import {GP} from "../../models/gp";


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointmentForm;

  public errorMessage: string;
  public successMessage: string;
  public message: string;

  constructor(private appointmentService: AppointmentService, private formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      description: [''],
      start: [''],
      is_digital: [false],
    })
  }

  ngOnInit(): void {
  }

  createAppointment(appointmentData) {
    this.errorMessage = "Er is iets fout gegaan";
    this.successMessage = "";

    //Endtime calculation by adding 15 minutes to the starttime.
    var startTime = new Date(Date.parse(appointmentData.start));
    console.log(startTime);
    var endTime = new Date(startTime.getTime() + 15*60000);

    //Gets user id
    let userId = parseInt(sessionStorage.getItem('user_id'));

    let GPUserId = this.appointmentService.getGPUSerId(userId);
    console.log(GPUserId);
    let bigCode = this.appointmentService.getBigCode(GPUserId);
    console.log(bigCode);

    let appointment = new Appointment(appointmentData.start, endTime, appointmentData.is_digital,
      appointmentData.description, "Zonnevelt Huisartsenpost", false, bigCode, userId);
    console.log(appointment)
    this.appointmentService.createAppointment(appointment)
      .subscribe((createdAppointment: Appointment) => {
        appointmentData.description = "";
        appointmentData.start = "";
        appointmentData.is_digital = "";
        const appointmentDate = new Date(appointment.start_time).toLocaleString();
        this.successMessage = `Uw afspraak is succesvol geboekt op ${appointmentDate}`;
        },
        (error: ErrorEvent) => {
        this.errorMessage = error.error.message;
        });
  }

}
