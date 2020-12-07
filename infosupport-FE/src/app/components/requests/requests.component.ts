import { Component, OnInit } from '@angular/core';
import {RequestGpService} from "../request-gp/request-gp.service";
import {RequestGP} from "../../models/requestgp";
import {log} from "util";


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requestList: Array<RequestGP> = [];


  constructor(private requestGpService: RequestGpService) { }

  ngOnInit(): void {
    this.getRequests();
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
