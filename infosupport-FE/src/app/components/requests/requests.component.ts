import { Component, OnInit } from '@angular/core';
import {RequestGpService} from "../request-gp/request-gp.service";
import {RequestGP} from "../../models/requestgp";
import {log} from "util";
import {LoginComponent} from '../login/login.component';
import {LoginService} from '../login/login.service';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requestList: Array<RequestGP> = [];
  id;


  constructor(private requestGpService: RequestGpService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getRequests();
    this.id = sessionStorage.getItem('user_id')
  }

  getRequests() {
    this.requestGpService.getRequestsForGP().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let dataRequest = new RequestGP(data[i].patient_user_id, data[i].gp_user_id, data[i].full_name, data[i].request_gp_id);
        this.requestList.push(dataRequest);
      }
    })
  }

  acceptRequest(gpUserId, userId, requestId) {
    if (confirm("Weet u zeker dat u de huisarts van de patient wilt zijn?")) {
      this.requestGpService.updateGP(gpUserId, userId).subscribe();

      this.requestGpService.deleteRequest(requestId).subscribe(data => {
        this.requestList = [];
        this.getRequests()
      });

      setTimeout(() =>{
        this.loginService.getLength(this.id).subscribe(data => {
          console.log(data.length);
        });
      }, 400)
    }
  }

  deleteRequest(requestId) {
    if (confirm("Weet u zeker dat u het verzoek van de patient wilt afwijzen?")) {

      this.requestGpService.deleteRequest(requestId).subscribe(data => {
        this.requestList = [];
        this.getRequests()
      });
    }
  }
}
