import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  event: object[] = [
    {
      // Login for GP
      Id: 1,
      Username: 'Admin',
      Password: 'Admin'
    },
    {
      // Login for patient
      Id: 2,
      Username: 'Guest@guest.nl',
      Password: 'Guest'
    }
  ]

  handleLogin(): void {
    // Find username and password

  }



}
