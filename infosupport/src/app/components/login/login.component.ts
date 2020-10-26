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

    this.loginService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(result => {

        //If user logs in as patient
        if(this.form.username.value instanceof Patient) {
          //Redirect to appointment
          this.router.navigate(['./appointment.component.html'])

          //If user logs in as GP
        } else if (this.form.username.value instanceof GP) {
          //Redirect to calender
          this.router.navigate(['./calender.component.html'])
        }
      });
  }


}
