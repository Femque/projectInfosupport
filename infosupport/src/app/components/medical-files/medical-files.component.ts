import { Component, OnInit } from '@angular/core';
import {Patient} from "../../models/patient";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../login/login.service";
import {AppointmentService} from "../appointment/appointment.service";
import {Appointment} from "../../models/appointment";
import {dateComparator} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";
import {getLocaleDateFormat} from "@angular/common";

@Component({
  selector: 'app-medical-files',
  templateUrl: './medical-files.component.html',
  styleUrls: ['./medical-files.component.css']
})
export class MedicalFilesComponent implements OnInit {

  loadedPatient : Patient;
  loadedAppointments : Appointment[] = [];

  currentDate = new Date();

  constructor(
    private http : HttpClient,
    private loginService : LoginService,
    private appointmentService : AppointmentService
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.getPastAppointments()
  }

  getUserInfo() : any {
    this.loginService.getPatientInfoById().subscribe(
      patient => {
        for (let i = 0; i < patient.length; i++) {
          let user_id = parseInt(sessionStorage.getItem('user_id'));
          if (patient[i].user_id == user_id) {
            this.loadedPatient = new Patient(
              patient[i].user_id,
              patient[i].dateOfBirth,
              patient[i].gender,
              patient[i].allergies,
              patient[i].email,
              patient[i].firstname,
              patient[i].lastname,
              patient[i].phonenumber,
              patient[i].password
            );
          }
        }
      }, error => console.log(error));
  }

  getPastAppointments() : any {
    this.appointmentService.getAppointmentsById().subscribe(
      appointment => {
        for (let i = 0; i < appointment.length; i++) {
          let pastAppointment = new Appointment(
            appointment[i].start_time,
            appointment[i].end_time,
            appointment[i].is_digital,
            appointment[i].description,
            appointment[i].location,
            appointment[i].is_follow_up,
            appointment[i].big_code,
            appointment[i].patient_user_id,
            appointment[i].title,
            appointment[i].appointment_code
          );

          let startDate = new Date(appointment[i].start_time);

          console.log("Current date = " +  this.currentDate);
          console.log("Existing appointments dates = " +  startDate);

          // Check if startdate of appointment is before the currentdate
          if (startDate < this.currentDate) {
            this.loadedAppointments.push(pastAppointment);
          }
        }
      }, error => console.log(error));
  }
}
