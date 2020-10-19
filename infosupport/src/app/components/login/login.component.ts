import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  event: object[] = [
    {
      // Login for GP
      Id: 1,
      Username: 'Admin',
      Password: 'Admin',
      Role: 'GP'
    },
    {
      // Login for patient
      Id: 2,
      Username: 'Guest@guest.nl',
      Password: 'Guest',
      Role: 'Patient'
    }
  ]

  handleLogin(): void {
    // Find username and password

    // Find role (GP, Patient, Assistent)
  }



}
