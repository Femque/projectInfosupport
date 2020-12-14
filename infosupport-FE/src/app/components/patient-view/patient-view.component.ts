import {Component, OnInit} from '@angular/core';
import {CalendarService} from "../calender/calendar.service";
import {Patient} from "../../models/patient";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LoginService} from "../login/login.service";

/**
 *  Patient-view Component - retrieves a table with all the patients for the doctor
 */

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

    this.childParamsSubscription = this.activatedRoute.params
      .subscribe((params: Params) => {
        this.selectedPatientId = +params.id;
      });
  }

  ngOnDestroy(): void {
    this.childParamsSubscription && this.childParamsSubscription.unsubscribe()
  }

  /**
   * Gets the big_code through the calender service using the user_id and sets it as big_code in the session storage
   * @param user_id
   */
  getBigCode(user_id) {
    this.calendarService.getBigCode(user_id).subscribe(data => {
      sessionStorage.setItem("big_code", JSON.stringify(data))
    });
  }

  /**
   * Gets the patients through login service which belong with the doctor using the gp_user_id
   * @param gp_user_id
   */
  getPatients(gp_user_id) {
    this.service.getPatientsForGp(gp_user_id).subscribe(data => {
      this.loadedPatients = data;
    }, error => {
      console.log(error);
    });
    return this.loadedPatients;
  }

  /**
   * Get the id for the clicked patient and select
   * @param id
   */
  clickedPatient(id) {
    if (id != null) {
      this.selectPatient(id);
    } else {
      this.selectPatient(-1);
    }
  }

  /**
   * Shows selected patient in the detail by using the id
   * @param id
   */
  selectPatient(id: number) {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute
    })
  }
}
