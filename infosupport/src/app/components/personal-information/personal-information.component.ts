import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../login/login.service';
import {Patient} from '../../models/patient';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  //list of appointments
  loadedPatient: Patient;

  constructor(private http: HttpClient,private loginService: LoginService ) {
  }

  ngOnInit() {
    this.getUserInfo();

  }




  //show appointments
  getUserInfo(): any {
    this.loginService.getPatientInfoById().subscribe(patient => {
      for (let i = 0; i < patient.length; i++) {
        // let app = new Date(data[i].start_time).toLocaleString();
        // let timeDateArray = startDateTime.split(" ");
        //
        // let test = timeDateArray[0].split("/");
        // let test3 = test[2].split(",");
        // let test2 = test3[0] + "-" + test[1] + "-" + test[0];
        // console.log(test2);
        let userId = parseInt(sessionStorage.getItem('user_id'));
        if(patient[i].user_id == userId) {
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
          console.log(this.loadedPatient)
          console.log(patient[i].user_id);
        }

      }
    }, error => console.log(error));
  }

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
