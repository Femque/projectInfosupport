import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {AppointmentService} from "../appointment/appointment.service";
import {CommonModule} from '@angular/common';
import {Appointment} from "../../models/appointment";
import {Patient} from "../../models/patient";
import {GP} from "../../models/gp";

/**
 * Home component - landingspage for user , patient and general practitioner
 */
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
  //list of patient
  loadedPatient: Patient;
  userRole: string;
  boolAppointmentGp: boolean;


  //Check if user is loggen in or not, decide if all nav-links are available
  isUserLoggedIn: boolean = false;

  constructor(
    public loginService: LoginService,
    public appointmentService: AppointmentService
  ) {
  }

  ngOnInit(): void {
    //checks wether the user is logged in
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    //getting the userRole
    this.userRole = sessionStorage.getItem('user_role');
    if (this.isUserLoggedIn) {
      this.getFullNameById();
      this.getAppointments();
      this.checkUserRole();
    }
  }

  /**
   * get fullName by the id of the user
   */
  getFullNameById() {
    this.appointmentService.getFullName().subscribe(data => {
      this.fullName = data
      let fullNameArray = this.fullName[0].split(",");
      let firstName = fullNameArray[0];
      let lastName = fullNameArray[1];
      this.fullName = firstName + " " + lastName;
    });
  }

  /**
   * getting the appointments,checks when it concerns a general practitioner or a patient
   */
  getAppointments(): any {
    if (this.userRole === "general_practitioner") {
      this.boolAppointmentGp = true;
    }
    // make a call to the appointmentService for getting the appointments by ID,
    // Based on a given boolean, the request is adjusted if it concerns a GP or patient
    this.appointmentService.getAppointmentsById(this.boolAppointmentGp).subscribe(appointment => {
      for (let i = 0; i < appointment.length; i++) {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var hours = today.toLocaleTimeString();
        var endDay = new Date();

        // @ts-ignore
        today = yyyy + '-' + mm + '-' + dd + 'T' + hours;
        // @ts-ignore
        endDay = yyyy + '-' + mm + '-' + dd + 'T' + '23:59:59';

        //check for GP
        if (this.userRole === "general_practitioner") {
          console.log('gp');
          if (appointment[i].start_time >= today && endDay >= appointment[i].end_time) {
            console.log("jp time")
            let newAppointment = new Appointment(appointment[i].start_time,
              appointment[i].end_time, appointment[i].is_digital, appointment[i].description, appointment[i].location,
              appointment[i].is_follow_up, appointment[i].big_code, appointment[i].patient_user_id, appointment[i].title, appointment[i].appointment_code);

            this.loadedAppointments.push(newAppointment);
          }
        }
        //check for the patient
        if (this.userRole === "patient") {
          console.log('gp');

          if (appointment[i].start_time >= today) {
            console.log("patient time")

            let newAppointment = new Appointment(appointment[i].start_time,
              appointment[i].end_time, appointment[i].is_digital, appointment[i].description, appointment[i].location,
              appointment[i].is_follow_up, appointment[i].big_code, appointment[i].patient_user_id, appointment[i].title, appointment[i].appointment_code);

            this.loadedAppointments.push(newAppointment);
          }
        }
      }
    }, error => console.log(error));
  }


  /**
   *method for checking whether it concerns a general practitioner or patient
   */
  checkUserRole(): any {
    if (this.userRole === "general_practitioner") {
      this.getUserInfo(true);
    } else {
      this.getUserInfo(false);
    }
  }

  /**
   * method for getting specific userInfo. Depends on whether it is a general practitioner or a patient
   * @param checkGp is a given boolean. If the user Role is a GP, the boolean is true
   */
  getUserInfo(checkGp: boolean): any {
    if (checkGp) {
      //make a call to the loginService for getting the GPs info by ID
      this.loginService.getGPInfoById().subscribe(gp => {
        let userId = parseInt(sessionStorage.getItem('user_id'));

        if (gp["user_id"] == userId) {
          this.user_id = gp["user_id"],
            this.firstname = gp["firstname"]
          this.dateOfBirth = gp["dateOfBirth"];
        }
      }, error => console.log(error));
    } else {
      //make a call to the loginService for getting the patients info by ID
      this.loginService.getPatientInfoById().subscribe(patient => {
        for (let i = 0; i < patient.length; i++) {
          let userId = parseInt(sessionStorage.getItem('user_id'));
          if (patient[i].user_id == userId) {
            this.user_id = patient[i].user_id;
            this.firstname = patient[i].firstname;
            this.dateOfBirth = patient[i].dateOfBirth
          }
        }
      }, error => console.log(error));
    }
  }
}
