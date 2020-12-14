import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Patient} from '../../../models/patient';
import {LoginService} from '../../login/login.service';
import {Appointment} from '../../../models/appointment';

/**
 * Patient-detail Component - shows the patient data from clicked patient in a form
 */

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  selectedPatientId: number;
  selectedPatient: Patient;
  patientCopy: Patient;
  loadedAppointments: Appointment[] = [];
  showMsg: boolean = false;
  private childParamsSubscription: Subscription = null;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public service: LoginService) {
  }

  ngOnInit(): void {
    this.childParamsSubscription = this.activatedRoute.params
      .subscribe((params: Params) => {
        this.setPatientId(params['id'] || -1);
        this.selectedPatient = this.patientCopy;
      })
    this.showMsg = false;
  }

  ngOnDestroy() {
    this.childParamsSubscription && this.childParamsSubscription.unsubscribe();
  }

  /**
   * Sets the id for the selected patient and getting patient data through the login service
   * @param id
   * @private
   */
  private setPatientId(id: number) {
    this.selectedPatientId = id

    this.service.findById(id).subscribe(
      patient => {
        for (let i = 0; i < patient.length; i++) {
          if (patient[i].user_id == id) {
            this.patientCopy = new Patient(
              patient[i].user_id,
              patient[i].dateOfBirth,
              patient[i].gender,
              patient[i].allergies,
              patient[i].email,
              patient[i].firstname,
              patient[i].lastname,
              patient[i].phonenumber,
              patient[i].password
            );

            this.selectedPatient = patient[i]
            this.showMsg = false;

            return this.patientCopy;
          }
        }
      }, error => console.log(error)
    )
  }

  /**
   * Checks the form for changes
   */
  isFormChanged(): boolean {
    return this.selectedPatient !== this.patientCopy;
  }

  /**
   * Switch case to handle button actions
   * @param action
   */
  action(action) {
    switch (action.toLowerCase()) {
      case "save":
        this.saveForm();

        break;
      case "cancel":
        if (confirm("Wil je stoppen met bewerken van gegevens?")) {
          this.cancelForm();
        }
        break;
      default:
        break;
    }
  }

  /**
   * Saves the changed data from the patient by sending the data to the login service
   */
  saveForm() {
    this.selectedPatient = this.patientCopy
    this.service.updatePatient(this.selectedPatient).subscribe(data => {
      this.patientCopy = Object.assign(this.selectedPatient);
      this.showMsg = true;
    })
  }

  /**
   * Cancels the changes made to the data and unselects patient
   */
  cancelForm() {
    this.selectedPatient = null;
    this.router.navigate([], {
      relativeTo: this.activatedRoute.parent
    })
  }
}
