import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../login/login.service';
import {Patient} from '../../models/patient';
import {FormBuilder} from '@angular/forms';
import {Appointment} from '../../models/appointment';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  //list of appointments
  loadedPatient: Patient;
  userForm;

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
  // @ViewChild('content')
  // content;

  constructor(private http: HttpClient, private loginService: LoginService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getUserInfo();
    this.userRole = sessionStorage.getItem('user_role');

    console.log('wat is firstname' + this.firstname);
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
    // console.log('userid' + this.user_id);
    let updatedUser = new Patient(
      // this.user_id,
      // this.email,
      // this.firstname,
      // this.lastname,x
      // this.password,
      // this.phonenumber,
      // this.dateOfBirth,
      // this.allergies
      this.user_id,
      this.dateOfBirth,
      this.gender,
      this.allergies,
      this.email,
      this.firstname,
      this.lastname,
      this.phonenumber,
      this.password
      // this.end_time,
      // this.is_digital,
      // this.description,
      // this.location,
      // this.is_follow_up,
      // this.big_code,
      // this.patient_user_id,
      // this.title,
      // this.appointment_code
    );
    // console.log(updatedUser);

    // @ts-ignore
    // console.log('na aanroepen update' + this.firstname);
    this.loginService.updatePatient(updatedUser).subscribe(
      (data) => {

        this.loadedPatient = null;
        this.getUserInfo();
      }
    );

    this.showMsg = true;

  }

  /*openUpdate(event: any) {
    this.selectedAppointment = event;
    this.firstname = this.loadedPatient.patient_user_id;
    this.location = event.location;
    this.start_time = event.start_time;
    this.end_time = event.end_time;
    this.is_follow_up = event.is_follow_up;
    this.is_digital = event.is_digital;
    this.description = event.description;
    this.big_code = event.big_code;
    this.appointment_code = event.appointment_code;
    this.title = event.titlePatient;

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
*/
  //delete appointment when cancelling appointment in overview
  //method called when user clicks cancel
  // public clickedAppointment(id) {
  //   if (id != null && confirm("Are you sure to delete "+ id)) {
  //     // this.onSelect(id);
  //     console.log(id);
  //     this.deleteAppointment(id);
  //   } else {
  //     // this.onSelect(-1)
  //   }
  // }

  //delete current appointment
  // @ts-ignore
  // deleteAppointment(id): any {
  //   console.log("loggieee ===" + id)
  //   this.appointmentService.deleteAppointment(id).subscribe(() => {
  //       this.loadedAppointments = [];
  //       this.getAppointments();
  //     }
  //   );
  //
  // }


}
