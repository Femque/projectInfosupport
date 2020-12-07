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
  patientCopy: Patient;
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
        // console.log("detail setup id =" + params['id']);
        this.setPatientId(params['id'] || -1);
        this.selectedPatient = this.patientCopy;
      })
  }
  ngOnDestroy() {
    this.childParamsSubscription && this.childParamsSubscription.unsubscribe();
  }

  private setPatientId(id: number) {
    // console.log(id)

     this.service.findById(id).subscribe(
      patient => {
        for (let i = 0; i < patient.length; i++) {
          let user_id = id;
          if (patient[i].user_id == user_id) {
            this.patientCopy = new Patient(
              patient[i].user_id,
              patient[i].dateOfBirth,
              patient[i].gender,
              patient[i].allergies,
              patient[i].email,
              patient[i].firstname,
              patient[i].lastname,
              patient[i].phonenumber
            );

            return this.patientCopy;
          }
        }
      }, error => console.log(error)
    )}

  isFormChanged() : boolean {
    return this.selectedPatient !== this.patientCopy;
  }

  action(action) {
    switch (action.toLowerCase()) {
      case "save":
        this.saveForm();
        break;
      case "cancel":
        if (confirm("Wil je stoppen met bewerken van gegevens?")){
          this.cancelForm();
        }
        break;
      default:
        break;
    }

  }

  saveForm() {
    let value = this.service.updatePatient(this.selectedPatient);
    this.patientCopy = Object.assign(this.selectedPatient);
  }

  cancelForm() {
    this.selectedPatientId = -1;
    this.router.navigate([], {
      relativeTo: this.activatedRoute
    })
  }

}
