import {Component, OnChanges, OnInit} from '@angular/core';
import {AppointmentService} from "../appointment/appointment.service";
import {Appointment} from "../../models/appointment";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {Calendar_appointment} from "../../models/calendar_appointment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-appointmentView',
  templateUrl: './appointmentView.component.html',
  styleUrls: ['./appointmentView.component.css']
})
export class AppointmentViewComponent implements OnInit {

  public title: string;
  public errorMessage: string;
  public successMessage: string;
  public appointmentDate: string;
  public appointmentTime: string;
  public appointmentMessage: string;
  public message: string;
  public fullName: string;

  //list of appointments
  loadedAppointments: Appointment[] = [];

  constructor(private http: HttpClient, private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.getAppointments();


    console.log(sessionStorage.getItem('user_id'));
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

        // @ts-ignore
        today = yyyy + '-' + mm + '-' + dd + 'T' + hours;
        console.log(today);
        console.log("startTime" + appointment[i].start_time);

        this.getFullNameById(appointment[i].big_code);

        if (appointment[i].start_time >= today) {
          console.log('yes datum is groter');

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
      // var res = data.replace(",", " ");
      // data.replace(/,/g, '');

      data = data.replace(/,/g, ""); // remove commas

      this.fullName = data;

    });
  }

  //delete appointment when cancelling appointment in overview
  //method called when user clicks cancel
  public clickedAppointment(id) {
    if (id != null && confirm("Are you sure to delete " + id)) {
      // this.onSelect(id);
      console.log(id);
      this.deleteAppointment(id);
    } else {
      // this.onSelect(-1)
    }
  }

  //delete current appointment
  // @ts-ignore
  deleteAppointment(id): any {
    console.log("loggieee ===" + id)
    this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.loadedAppointments = [];
        this.getAppointments();
      }
    );

  }


}
