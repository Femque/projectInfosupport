import {Component, OnInit} from '@angular/core';
// import {LoginService} from "./login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import { GP } from 'src/app/models/gp';
import { Patient } from 'src/app/models/patient';
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  username = '';
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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    sessionStorage.setItem('token', '');
  }

  //Getter for access form fields
  get form() {
    return this.loginForm.controls;
  }

  handleLogin(): void {
    this.submitted = true;

    //If invalid
    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginService.authenticate(this.username, this.password)) {
      //If user = patient
      if (this.form.username.value instanceof Patient) {
        this.router.navigate(['./appointment.component.html'])

        //If user = gp
      } else if (this.form.username.value instanceof GP) {
        this.router.navigate(['./calender.component.html'])
      }
    }
  }
}
