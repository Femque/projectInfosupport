import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {GP} from "../../models/gp";
import {Appointment} from "../../models/appointment";
import {Patient} from "../../models/patient";

@Injectable({
  providedIn: 'root'
})
export class RequestGpService {

  getDoctorsUrl = 'http://localhost:8080/doctor'
  getDoctorByUserId = 'http://localhost:8080/patient/gp'


  constructor(private http: HttpClient) { }

  getGPs(): Observable<GP[]> {
    return this.http.get<GP[]>(this.getDoctorsUrl)
  }

  //getting gp by user id
  getGPByPatientUserId(user_id: number) {
    const url = `${this.getDoctorByUserId}/${user_id}`;
    return this.http.get<number>(url)
  }
}
