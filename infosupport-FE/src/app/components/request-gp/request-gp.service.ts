import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {GP} from "../../models/gp";
import {RequestGP} from "../../models/requestgp";
import {httpFactory} from "@angular/http/src/http_module";

@Injectable({
  providedIn: 'root'
})
export class RequestGpService {

  requestLength;

  //URL to get all doctors
  getDoctorsUrl = 'http://localhost:8080/doctor';
  //URL to get all requests
  getRequestsURL = 'http://localhost:8080/requests';
  //URL to get a patient by gp_user_id
  getDoctorByUserId = 'http://localhost:8080/patient/gp';
  //URL to create a request (POST)
  createRequestUrl = 'http://localhost:8080/requests/create';
  //URL to get full name of user
  getUserFullNameUrl = 'http://localhost:8080/user/fullname';
  //URL to update gp_user_id for patient
  updatePatientGPUrl = 'http://localhost:8080/patient/update';


  constructor(private http: HttpClient) { }

  getGPs(): Observable<GP[]> {
    return this.http.get<GP[]>(this.getDoctorsUrl)
  }

  getRequestsForGP(): Observable<RequestGP[]> {
    const url = `${this.getRequestsURL}/gp/${sessionStorage.getItem('user_id')}`;
    this.http.get<RequestGP[]>(url).subscribe(data => {
      this.requestLength = data.length
      console.log(this.requestLength);
    })

    return this.http.get<RequestGP[]>(url);
  }

  //getting gp by user id
  getGPByPatientUserId(user_id: number) {
    const url = `${this.getDoctorByUserId}/${user_id}`;
    return this.http.get<number>(url)
  }

  createRequest(requestGP: RequestGP): Observable<RequestGP> {
    console.log("Creating request...");
    return this.http.post<RequestGP>(this.createRequestUrl, requestGP)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteRequest(id: number): Observable<{}> {
    const url = `${this.getRequestsURL + "/delete"}/${id}`;
    return this.http.delete(url)
  }

  getFullName(id: number) {
    const url = `${this.getUserFullNameUrl}/${id}`;
    return this.http.get<string>(url);
  }

  updateGP(gpUserId: number, userId: number) {
    const url = `${this.updatePatientGPUrl}/${userId}/${gpUserId}`
    return this.http.put(url, [userId, gpUserId,]);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
