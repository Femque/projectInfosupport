import {Component, OnChanges, OnInit} from '@angular/core';
import {AppointmentService} from "../appointment/appointment.service";
import {Appointment} from "../../models/appointment";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {Calendar_appointment} from "../../models/calendar_appointment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {GP} from "../../models/gp";
import {ChatService} from "../chat/chat.service";


@Component({
  selector: 'app-appointmentView',
  templateUrl: './appointmentView.component.html',
  styleUrls: ['./appointmentView.component.css']
})
export class AppointmentViewComponent implements OnInit {

  public title: string;
  public successMessage: string;
  public appointmentDate: string;
  public appointmentTime: string;
  public message: string;
  public fullName: string;

  //list of appointments
  loadedAppointments: Appointment[] = [];
  arrayDatesStartTime: any[] = [];
  arrayDatesEndTime: any[] = [];

  constructor(private http: HttpClient, private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.getAppointments();
  }


  //show appointments
  getAppointments(): any {
    this.appointmentService.getAppointmentsById().subscribe(appointment => {
      for (let i = 0; i < appointment.length; i++) {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var hours = today.toLocaleTimeString();
        var startTime = new Date(appointment[i].start_time);
        var endTime = new Date(appointment[i].end_time);
        var months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober",
          "November", "December"];
        var days = ["Zondag", "Maandag", "Disndag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
        this.arrayDatesStartTime[i] = days[startTime.getDay()] + " " + startTime.getDate() + " " +
          months[startTime.getMonth()] + " " + startTime.getFullYear() + " om " + startTime.getHours() + ":" + startTime.getMinutes();
        this.arrayDatesEndTime[i] = days[endTime.getDay()] + " " + endTime.getDate() + " " +
          months[endTime.getMonth()] + " " + endTime.getFullYear() + " om " + endTime.getHours() + ":" + endTime.getMinutes();

        // @ts-ignore
        today = yyyy + '-' + mm + '-' + dd + 'T' + hours;

        this.getFullNameById(appointment[i].big_code);

        if (appointment[i].start_time >= today) {
          let newAppointment = new Appointment(appointment[i].start_time,
            appointment[i].end_time, appointment[i].is_digital, appointment[i].description, appointment[i].location,
            appointment[i].is_follow_up, appointment[i].big_code, appointment[i].patient_user_id, appointment[i].title, appointment[i].appointment_code);

          this.loadedAppointments.push(newAppointment);
        }
      }
    }, error => console.log(error));
  }
  
  getFullNameById(bigCode: number) {
    this.appointmentService.getFullNameBig(bigCode).subscribe(data => {
      this.fullName = data;
      var fullNameArray = this.fullName[0].split(",");
      var firstName = fullNameArray[0];
      var lastName = fullNameArray[1];
      this.fullName = firstName + " " + lastName;
    });
  }

  //delete appointment when cancelling appointment in overview
  //method called when user clicks cancel
  public clickedAppointment(id) {
    if (id != null && confirm("Weet u zeker dat u deze afspraak wilt annuleren? ")) {
      this.deleteAppointment(id);
    } else {
    }
  }

  //delete current appointment
  // @ts-ignore
  deleteAppointment(id): any {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.loadedAppointments = [];
        this.getAppointments();
      }
    );
  }
}
