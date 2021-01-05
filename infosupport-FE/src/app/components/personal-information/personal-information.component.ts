import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../login/login.service';
import {Patient} from '../../models/patient';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDate, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Appointment} from '../../models/appointment';
import {ConfirmedValidator} from "./personal-information-confirmed.validator";
import {User} from "../../models/user";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  //list of appointments
  loadedUser: User;
  showMsg: boolean = false;
  user_id: number;
  gender: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordInitialize: string;
  phonenumber: string;
  dateOfBirth: Date;
  allergies: string;
  userRole: string;

  constructor(private http: HttpClient, private loginService: LoginService, private formBuilder: FormBuilder,
              private modalService: NgbModal) {
    this.form = formBuilder.group({
      phoneNumber: [],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      firstPassword: [],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  ngOnInit() {
    this.getUserInfo();
    this.userRole = sessionStorage.getItem('user_role');
  }

  /**
   * method for closing the modal after saving the new form data
   */
  dismiss() {
    this.modalService.dismissAll();
    location.href = "#";
  }

  /**
   * method for the password
   * @param event
   * @param firstTime
   */
  onInputChange(event: any, firstTime: boolean) {
    if (firstTime === true) {
      this.passwordInitialize = event.target.value;
    } else {
      this.password = event.target.value;
    }
  }

  pwCheck(): boolean {
    if (this.loadedUser.password != this.passwordInitialize) {
      return true;
    } else {
      const el = document.querySelectorAll('#password,#confirm_password');
      for (var i = 0; i < el.length; i++) {
        el[i].classList.remove("defaultPw");
      }
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  get f() {
    return this.form.controls;
  }

  //method for modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, () => {
    });
  }

  //show appointments
  getUserInfo(): any {
    this.loginService.getUserInfoById().subscribe(user => {
      for (let i = 0; i < user.length; i++) {

        let userId = parseInt(sessionStorage.getItem('user_id'));
        if (user[i].user_id == userId) {
          this.user_id = user[i].user_id;
          this.firstname = user[i].firstname;
          this.lastname = user[i].lastname;
          this.email = user[i].email;
          this.phonenumber = user[i].phonenumber;
          this.passwordInitialize = '';
          this.dateOfBirth = user[i].dateOfBirth;
          this.gender = user[i].gender;

          this.loadedUser = new User(
            user[i].user_id,
            user[i].firstname,
            user[i].lastname,
            user[i].email,
            user[i].phonenumber,
            user[i].password,
            user[i].dateOfBirth,
            user[i].gender
          );
        }

      }
    }, error => console.log(error));
  }

  updateUser() {
    let updatedUser = new User(
      this.user_id,
      this.firstname,
      this.lastname,
      this.email,
      this.phonenumber,
      this.password,
      this.dateOfBirth
    );

    this.loginService.updateUser(updatedUser).subscribe(
      (data) => {
        this.loadedUser = null;
        this.getUserInfo();
        this.loginService.logOut();
      }
    );
    this.showMsg = true;
  }
}
