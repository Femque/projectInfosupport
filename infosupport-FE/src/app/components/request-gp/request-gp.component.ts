import { Component, OnInit } from '@angular/core';
import {RequestGpService} from "./request-gp.service";
import {GP} from "../../models/gp";
import {Patient} from "../../models/patient";
import {RequestGP} from "../../models/requestgp";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-request-gp',
  templateUrl: './request-gp.component.html',
  styleUrls: ['./request-gp.component.css']
})
export class RequestGpComponent implements OnInit {

  doctorId: number;
  gpList: GP[] = [];
  currentGP: GP;
  fullName: string;
  isCurrentGP: boolean;

  constructor(private requestGpService: RequestGpService) { }

  ngOnInit(): void {
    this.getGpUser_id(sessionStorage.getItem('user_id'));
    this.getGPs();
    this.getCurrentGP();
    this.getFullNameById(parseInt(sessionStorage.getItem('user_id')))
  }

  requestGP(gpUserId) {
    if (confirm("Weet je zeker dat je een nieuwe huisarts wilt aanvragen?")) {
    //Get user id
    let userId = parseInt(sessionStorage.getItem('user_id'));
    let newRequest = new RequestGP(userId, gpUserId, this.fullName)
    this.requestGpService.createRequest(newRequest).subscribe();
    }
  }

  getCurrentGP() {
    for (let i = 0; i < this.gpList.length; i++) {
      if (this.gpList[i].user_id === this.doctorId) {
        console.log(this.gpList[i].user_id);
        console.log(this.doctorId);
      }
    }
  }

  getGpUser_id(user_id) {
    this.requestGpService.getGPByPatientUserId(user_id).subscribe(data => {
      this.doctorId = data
    });
  }

  getGPs() {
    this.requestGpService.getGPs().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let dataGp = new GP(
          data[i].big_code, data[i].specialty, data[i].user_id,
          data[i].email, data[i].firstname, data[i].lastname,
          data[i].password
        );
        this.gpList.push(dataGp);
      }
    })
  }

  getFullNameById(id: number) {
    this.requestGpService.getFullName(id).subscribe(data => {
      this.fullName = data;
      var fullNameArray = this.fullName[0].split(",");
      var firstName = fullNameArray[0];
      var lastName = fullNameArray[1];
      this.fullName = firstName + " " + lastName;
    });
  }
}
