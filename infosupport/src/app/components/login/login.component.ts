import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {Patient} from "../../models/patient";
import {GP} from "../../models/gp";
import {Observable, Subscription} from "rxjs";


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
  id: number ;

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
      data => this.user = data,
      error => error
    )
    console.log(this.user.email);
    let id = this.getUser_id(this.user.email);

    console.log(id);


    // if () {
    //   console.log("Logging in as general practitioner")
    //   this.router.navigate(['./calender'])
    // } else if () {
    //   console.log("Logging in as patient")
    //   this.router.navigate(['./appointment'])
    // } else {
    //   console.log("It's not working yet")
    // }
  }

  getUser_id(email: string) {
    return this.loginService.fetchUserId(email).subscribe(
      data => console.log(data),
        error => error
      )
  }
}
