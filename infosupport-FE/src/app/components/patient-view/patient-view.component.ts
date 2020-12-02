import {Component, Injectable, OnInit} from '@angular/core';
import {CalendarService} from "../calender/calendar.service";


@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})

export class PatientViewComponent implements OnInit {
  patients: Array<string> = [];

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.getBigCode(sessionStorage.getItem('user_id'));
    this.getPatients(sessionStorage.getItem('user_id'));
  }

  getBigCode(user_id) {
    this.calendarService.getBigCode(user_id).subscribe( data => {
      sessionStorage.setItem("big_code", JSON.stringify(data))
      console.log("big code = " + sessionStorage.getItem("big_code"));
    });
  }

  getPatients(gp_user_id) {
    this.calendarService.getPatientsForGp(gp_user_id).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let test = data[i].split(',');
        let test2 = test[0] + ' ' + test[1];
        this.patients.push(test2);
      }
    });

    return this.patients;
  }

  loadPatientInfo() {

  }

  clickedPatient() {

  }
}
