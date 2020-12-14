import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../login/login.service';
import {Patient} from '../../models/patient';
import {FormBuilder} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDate, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Appointment} from '../../models/appointment';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  //list of appointments
  loadedPatient: Patient;
  showMsg: boolean = false;
  user_id: number;
  gender: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phonenumber: string;
  dateOfBirth: Date;
  allergies: string;
  userRole: string;

  constructor(private http: HttpClient, private loginService: LoginService, private formBuilder: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getUserInfo();
    this.userRole = sessionStorage.getItem('user_role');

    console.log('wat is firstname' + this.firstname);
  }

  //method for modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, () => {
    });
  }

  //show appointments
  getUserInfo(): any {
    this.loginService.getPatientInfoById().subscribe(patient => {
      for (let i = 0; i < patient.length; i++) {

        let userId = parseInt(sessionStorage.getItem('user_id'));
        if (patient[i].user_id == userId) {
          this.user_id = patient[i].user_id;
          this.dateOfBirth = patient[i].dateOfBirth;
          this.gender = patient[i].gender;
          this.allergies = patient[i].allergies;
          this.email = patient[i].email;
          this.firstname = patient[i].firstname;
          this.lastname = patient[i].lastname;
          this.phonenumber = patient[i].phonenumber;
          this.password = patient[i].password;


          this.loadedPatient = new Patient(
            patient[i].user_id,
            patient[i].dateOfBirth,
            patient[i].gender,
            patient[i].allergies,
            patient[i].email,
            patient[i].firstname,
            patient[i].lastname,
            patient[i].phonenumber,
            patient[i].password
          );
          console.log(this.loadedPatient);
          console.log(patient[i].user_id);
        }

      }
    }, error => console.log(error));
  }

  updatePatient() {
    let updatedUser = new Patient(
      this.user_id,
      this.dateOfBirth,
      this.gender,
      this.allergies,
      this.email,
      this.firstname,
      this.lastname,
      this.phonenumber,
      this.password
    );

    this.loginService.updatePatient(updatedUser).subscribe(
      (data) => {
        //TODO fix closing modal
        this.loadedPatient = null;
        this.getUserInfo();
      }
    );

    this.showMsg = true;

  }
}
