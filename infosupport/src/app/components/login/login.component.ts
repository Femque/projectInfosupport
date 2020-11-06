import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {Patient} from "../../models/patient";
import {GP} from "../../models/gp";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  user = new User();
  gp = new GP();
  patient = new Patient();

  email = '';
  password = '';

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    sessionStorage.setItem('token', '');
  }

  //Getter for access form fields
  get form() {
    return this.loginForm.controls;
  }

  handleLogin() {
    this.submitted = true;
    this.loginService.loginUserFromRemote(this.user).subscribe(
      data => console.log("Response received"),
      error => console.log("Something went wrong")
    )

    if (this.user.user_id == this.gp.big_code) {
      console.log("Logging in as general practitioner")
      this.router.navigate(['./calender.component.html'])
    } else if (this.user.user_id == this.patient.user_id) {
      console.log("Logging in as patient")
      this.router.navigate(['./appointment.component.html'])
    } else {
      console.log("It's not working yet")
    }
  }
}
