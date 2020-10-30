import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //Check if user is loggen in or not, decide if all nav-links are available
  isUserLoggedIn : boolean = false;

  constructor(
    private loginService : LoginService
  ) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
  }

}
