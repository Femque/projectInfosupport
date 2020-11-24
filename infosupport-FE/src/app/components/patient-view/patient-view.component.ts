import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {


  patients : Array<string[]> = [];

  //test
  allPatients = [
    {
      firstName: 'Fred',
      lastname: 'Hond'
    },
    {
      firstName: 'Frank',
      lastname: 'Hond'
    },
    {
      firstName: 'Gert',
      lastname: 'Kat'
  }];

  formGroup : FormGroup;
  term: string;

  constructor() {
  }

  ngOnInit() : void {
  }

}
