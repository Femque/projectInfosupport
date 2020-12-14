import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";

/**
 * Login Component - Handles the login and session storage
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  user = new User();
  email = '';
  password = '';
  id: number;
  role : boolean;
  errorMsg : boolean = false;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Getter for access form fields
   */
  get form() {
    return this.loginForm.controls;
  }

  /**
   * Handles the login by sending the user data to the login service
   */
  handleLogin() {
    this.submitted = true;
    this.loginService.loginUserFromRemote(this.user).subscribe(
      data => {
        this.user = data
        let id = this.getUser_id(this.user.email);
        let role = this.getUserRole(this.user.email); // Value True = Patient, False = GP
      },
      error => {
        console.log(error)
        this.errorMsg = true
      })
  }

  /**
   * Fetches the user_id by using the email in the login service and assign the user_id in the session storage
   * @param email
   */
  getUser_id(email: string) {
    return this.loginService.fetchUserId(email).subscribe(
      data => sessionStorage.setItem('user_id' , JSON.stringify(data)),
        error => error
      )
  }

  /**
   * Fetches the user_role by using the email in the login service and assign the user_role in the session storage
   * If the data has the value true the user logs in as patient
   * If the data has the value false the user logs in as doctor
   * @param email
   */
  getUserRole(email: string) {
    return this.loginService.getUserRole(email).subscribe(
      data => {
        this.role = (data);
        if (data == true) {
          sessionStorage.setItem('user_role', 'patient')
          this.router.navigate(['./home'])
        } else if (data == false) {
          this.router.navigate(['./home'])
          sessionStorage.setItem('user_role', 'general_practitioner')
        }
      },
      error => error
    )
  }
}
