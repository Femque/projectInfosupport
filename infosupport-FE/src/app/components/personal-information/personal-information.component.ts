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
  //list of users
  loadedUser: User;
  showMsg: boolean = false;
  user_id: number;
  gender: string;
  email: string;
  firstname: string;
  lastname: string;
  //password used for
  password: string;
  //used passwordInitialize for comparing between current password user and the password provided by the user
  passwordInitialize: string;
  phonenumber: string;
  dateOfBirth: Date;
  allergies: string;
  userRole: string;

  constructor(private http: HttpClient, private loginService: LoginService, private formBuilder: FormBuilder,
              private modalService: NgbModal) {
    //formgroup with validators
    this.form = formBuilder.group({
      phoneNumber: [''],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      firstPassword: [''],
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
   * method to check with the user's current password if it's true. When it becomes false
   * get the password just entered by by entered user's password
   * @param event that is executed when something changes
   * @param is true or false using the first or second password box
   */
  onInputChange(event: any, firstTime: boolean) {
    if (firstTime === true) {
      this.passwordInitialize = event.target.value;
    } else {
      this.password = event.target.value;
    }
  }

  /**
   * method that ensures whether or not the attribute is fillable based on the given passwords of the user
   */
  pwCheck(): boolean {
    //returns true if the current password of the user is not the same as the password entered by him or her
    if (this.loadedUser.password != this.passwordInitialize) {
      return true;
    }
    //removes a className, this ensures that the attribute can be used again to enter a password
    else {
      const el = document.querySelectorAll('#password,#confirm_password');
      for (var i = 0; i < el.length; i++) {
        el[i].classList.remove("defaultPw");
      }
    }
  }

  /**
   *method that returns true or false, that depends on entering numbers of a phone number
   * @param event that is given when the user enters something in the text box
   */
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  /**
   * method for getting the form controls
   */
  get f() {
    return this.form.controls;
  }

  /**
   * method for opening the modals content when the click button has fired
   * @param content opens the corresponding content of the modal
   */
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, () => {
    });
  }

  /**
   * method of obtaining information from the user
   */
  getUserInfo(): any {
    //make a call to the loginService to obtain information from the user
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

  /**
   * method for updating the user's data
   */
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

    //make a call to the loginService to update the user with the new values
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
