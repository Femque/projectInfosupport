import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {AppointmentService} from "../appointment/appointment.service";
import {RequestGpService} from "../request-gp/request-gp.service";
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  fullName: string;
  userRole: string;
  requestsLength: number;

  constructor(
    public loginService: LoginService,
    public appointmentService: AppointmentService,
    public requestGpService: RequestGpService
  ) {
  }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('user_role');

    if (this.loginService.isUserLoggedIn) {
      this.getFullNameById();

      if (this.userRole == 'general_practitioner') {
        this.requestGpService.getRequestsForGP().subscribe(data => {
          this.requestsLength = data.length;
        })
      }

    }

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

  refreshNavBar() {
    this.ngOnInit();
  }
}
