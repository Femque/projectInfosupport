import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Patient} from "../../../models/patient";
import {LoginService} from "../../login/login.service";
import {Appointment} from "../../../models/appointment";
import {AppointmentService} from "../../appointment/appointment.service";

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  selectedPatientId: number;
  private _selectedPatient: Patient;
  patient: Patient;
  loadedAppointments : Appointment[] = [];

  set selectedPatient(patient: Patient) {
    this._selectedPatient = patient;
  }

  get selectedPatient() {
    return this._selectedPatient;
  }

  private childParamsSubscription: Subscription = null;

  constructor(public router : Router,
              public activatedRoute : ActivatedRoute,
              public service : LoginService) { }

  ngOnInit(): void {
    this.childParamsSubscription = this.activatedRoute.params
      .subscribe((params: Params) => {
        this.setPatientId(params['id'] || -1);
        this.patient = Object.assign(new Patient(), this.selectedPatient);
      })
  }
  ngOnDestroy() {
    this.childParamsSubscription && this.childParamsSubscription.unsubscribe();
  }

  private setPatientId(id: number) {
    this._selectedPatient = this.service.findById(id);
    this.patient = this._selectedPatient;
    this.patient = Object.assign(new Patient(), this.selectedPatient);
  }
}
