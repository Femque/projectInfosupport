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

  public errorMessage: string;
  public successMessage: string;
  public appointmentDate: string;
  public appointmentTime: string;
  public appointmentMessage: string;
  public message: string;

  //list of appointments
  loadedAppointments: Appointment[] = [];

  constructor(private http: HttpClient,private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.getAppointments();
  }


  //show appointments
  getAppointments(): any {
    this.appointmentService.getAppointments().subscribe(appointment => {
      for (let i = 0; i < appointment.length; i++) {
        // let app = new Date(data[i].start_time).toLocaleString();
        // let timeDateArray = startDateTime.split(" ");
        //
        // let test = timeDateArray[0].split("/");
        // let test3 = test[2].split(",");
        // let test2 = test3[0] + "-" + test[1] + "-" + test[0];
        // console.log(test2);

        let newAppointment = new Appointment(appointment[i].start_time,
          appointment[i].end_time, appointment[i].is_digital, appointment[i].description, appointment[i].location,
          appointment[i].is_follow_up, appointment[i].big_code, appointment[i].patient_user_id,appointment[i].appointment_code);

        this.loadedAppointments.push(newAppointment);
      }
    }, error => console.log(error));
  }

  //delete appointment when cancelling appointment in overview
  //method called when user clicks cancel
  public clickedAppointment(id) {
    if (id != null) {
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
