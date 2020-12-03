import { Component, OnInit } from '@angular/core';
import {RequestGpService} from "./request-gp.service";
import {GP} from "../../models/gp";
import {Patient} from "../../models/patient";

@Component({
  selector: 'app-request-gp',
  templateUrl: './request-gp.component.html',
  styleUrls: ['./request-gp.component.css']
})
export class RequestGpComponent implements OnInit {

  doctorId: number;
  gpList: GP[] = [];
  currentGP: GP;

  constructor(private requestGpService: RequestGpService) { }

  ngOnInit(): void {
    this.getGpUser_id(sessionStorage.getItem('user_id'));
    this.getGPs();
    
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
}
