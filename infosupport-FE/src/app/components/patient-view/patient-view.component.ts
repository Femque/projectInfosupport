import {Component, Injectable, OnInit} from '@angular/core';
import {CalendarService} from "../calender/calendar.service";
import {Patient} from "../../models/patient";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LoginService} from "../login/login.service";


@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})

export class PatientViewComponent implements OnInit {
  patients: Patient[];
  _selectedPatientId: number;
  loadedPatients: Patient[] = [];
  childParamsSubscription: Subscription = null;

  set selectedPatientId(id: number) {
    this._selectedPatientId = id;
  }

  get selectedPatientId() {
    return this._selectedPatientId;
  }

  constructor(private calendarService: CalendarService,
              private service: LoginService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.loadedPatients = this.getPatients(sessionStorage.getItem('user_id'));
    this.getBigCode(sessionStorage.getItem('user_id'));
    // this.getPatients(sessionStorage.getItem('user_id'));

    this.childParamsSubscription = this.activatedRoute.params
      .subscribe((params: Params) => {
        this.selectedPatientId = +params.id;
      });
  }

  ngOnDestroy(): void {
    this.childParamsSubscription && this.childParamsSubscription.unsubscribe()
  }

    getBigCode(user_id) {
    this.calendarService.getBigCode(user_id).subscribe( data => {
      sessionStorage.setItem("big_code", JSON.stringify(data))
      console.log("big code = " + sessionStorage.getItem("big_code"));
    });
  }

  getPatients(gp_user_id) {
    this.service.getPatientsForGp(gp_user_id).subscribe(data => {
      console.log(data);
      this.loadedPatients = data;
    }, error => {
      console.log(error);
    });
    return this.loadedPatients;
  }

  clickedPatient(id) {
    // console.log("Patient id = " + id)
    if (id != null) {
      this.selectPatient(id);
    } else {
      this.selectPatient(-1);
    }
  }

  selectPatient(id: number) {
    // console.log("selected id = " + id);
    this.router.navigate([id], {
      relativeTo: this.activatedRoute
    })
  }
}
