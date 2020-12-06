import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {AppointmentService} from "../appointment/appointment.service";
import {CommonModule} from '@angular/common';
import {Appointment} from "../../models/appointment";
import {Patient} from "../../models/patient";
import {GP} from "../../models/gp";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  //use for printing name
  user_id: number;
  fullName: string;
  firstname: string;
  dateOfBirth: Date;
  //list of appointments
  loadedAppointments: Appointment[] = [];
  //list of appointments
  loadedPatient: Patient;
  userRole: string;


  //Check if user is loggen in or not, decide if all nav-links are available
  isUserLoggedIn: boolean = false;

  constructor(
    public loginService: LoginService,
    public appointmentService: AppointmentService
  ) {
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    this.userRole = sessionStorage.getItem('user_role');
    this.getFullNameById();
    this.getAppointments();
    this.checkUserRole();
  }

  getFullNameById() {
    this.appointmentService.getFullName().subscribe(data => {
      this.fullName = data
      let fullNameArray = this.fullName[0].split(",");
      let firstName = fullNameArray[0];
      let lastName = fullNameArray[1];
      this.fullName = firstName.toUpperCase() + " " + lastName.toUpperCase();
    });
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

        if (appointment[i].start_time >= today) {

          let newAppointment = new Appointment(appointment[i].start_time,
            appointment[i].end_time, appointment[i].is_digital, appointment[i].description, appointment[i].location,
            appointment[i].is_follow_up, appointment[i].big_code, appointment[i].patient_user_id, appointment[i].title, appointment[i].appointment_code);

          this.loadedAppointments.push(newAppointment);
        }
      }
    }, error => console.log(error));
  }


  checkUserRole(): any {
    if (this.userRole === "general_practitioner") {
      this.getUserInfo(true);
    } else {
      this.getUserInfo(false);
    }
  }

  //show appointments
  getUserInfo(checkGp: boolean): any {
    if (checkGp) {
      this.loginService.getGPInfoById().subscribe(gp => {
        let userId = parseInt(sessionStorage.getItem('user_id'));

        if (gp["user_id"] == userId) {
          this.user_id = gp["user_id"],
            this.firstname = gp["firstname"]
          this.dateOfBirth = gp["dateOfBirth"];
        }
      }, error => console.log(error));
    } else {
      this.loginService.getPatientInfoById().subscribe(patient => {
        for (let i = 0; i < patient.length; i++) {
          let userId = parseInt(sessionStorage.getItem('user_id'));
          if (patient[i].user_id == userId) {
            this.user_id = patient[i].user_id,
              this.firstname = patient[i].firstname,
              this.dateOfBirth = patient[i].dateOfBirth
          }
        }
      }, error => console.log(error));
    }
  }
}




