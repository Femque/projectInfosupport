import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Patient} from "../../../models/patient";

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  selectedPatientId: 0;
  private _selectedPatient: Patient;

  patient: Patient;

  set selectedPatient(patient: Patient) {
    this._selectedPatient = patient;
  }

  get selectedPatient() {
    return this._selectedPatient;
  }

  private childParamsSubscription: Subscription = null;

  constructor(public router : Router, public activatedRoute : ActivatedRoute) { }

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
    // this._selectedPatient
  }
}
