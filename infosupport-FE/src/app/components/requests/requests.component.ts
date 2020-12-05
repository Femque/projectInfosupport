import { Component, OnInit } from '@angular/core';
import {RequestGpService} from "../request-gp/request-gp.service";
import {RequestGP} from "../../models/requestgp";


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requestList: Array<RequestGP> = [];
  fullName: string;


  constructor(private requestGpService: RequestGpService) { }

  ngOnInit(): void {
    this.getRequests();
    // this.addFullNameToRequests();
  }

  getRequests() {
    this.requestGpService.getRequestsForGP().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let fullName = this.getFullNameById(data[i].patient_user_id);
        console.log(fullName);
        let dataRequest = new RequestGP(data[i].patient_user_id, data[i].gp_user_id, data[i].request_gp_id);
        this.requestList.push(dataRequest);
      }
    })
  }

  getFullNameById(id: number) {
    this.requestGpService.getFullName(id).subscribe(data => {
      this.fullName = data
      var fullNameArray = this.fullName[0].split(",");
      var firstName = fullNameArray[0];
      var lastName = fullNameArray[1];
      console.log(firstName + " " + lastName);
      return firstName + " " + lastName;
    });
  }

  // addFullNameToRequests() {
  //   console.log(this.requestList);
  //   for (let i = 0; i < this.requestList.length; i++) {
  //     console.log(this.requestList[i]);
  //   }
  // }

  acceptRequest(gpUserId, userId, requestId) {
    this.requestGpService.updateGP(gpUserId, userId).subscribe();

    this.requestGpService.deleteRequest(requestId).subscribe(data => {
      this.requestList = [];
      this.getRequests()
    });
  }

  deleteRequest(requestId) {
    this.requestGpService.deleteRequest(requestId).subscribe(data => {
      this.requestList = [];
      this.getRequests()
    });
  }

}
