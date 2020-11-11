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

    let id = this.getUser_id(this.user.email);

    // let role = this.getUserRole(this.user.email); // Value True = Patient, False = GP
    
    // if (true) {
    //   console.log("Logging in as patient")
    //   this.router.navigate(['./appointment'])
    // } else if (false) {
    //   console.log("Logging in as general practitioner")
    //   this.router.navigate(['./calender'])
    // } else {
    //   console.log("It's not working yet")
    // }
  }

  getUser_id(email: string) {
    return this.loginService.fetchUserId(email).subscribe(
      data => sessionStorage.setItem('user_id' , JSON.stringify(data)),
        error => error
      )
  }

  getUserRole(email: string) {
    return this.loginService.getUserRole(email).subscribe(
      data => (console.log(data)),
      error => error
    )
  }
}
