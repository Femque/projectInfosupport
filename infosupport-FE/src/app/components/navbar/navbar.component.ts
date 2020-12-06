import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {AppointmentService} from "../appointment/appointment.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  fullName: string;
  userRole: string;

  //Check if user is loggen in or not, decide if all nav-links are available
  isUserLoggedIn : boolean = false;

  constructor(
    public loginService : LoginService,
    public appointmentService : AppointmentService
  ) { }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('user_role');
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    this.getFullNameById();

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
}
