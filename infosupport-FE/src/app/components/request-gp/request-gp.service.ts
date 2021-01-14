import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

import {GP} from "../../models/gp";
import {RequestGP} from "../../models/requestgp";
import {httpFactory} from "@angular/http/src/http_module";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestGpService {

  //Variable for amount of requests in navigation bar
  requestLength;

  //URL to get all doctors
  getDoctorsUrl = environment.apiUrl + '/doctor';
  //URL to get all requests
  getRequestsURL = environment.apiUrl + '/requests';
  //URL to get a patient by gp_user_id
  getDoctorByUserId = environment.apiUrl + '/patient/gp';
  //URL to create a request (POST)
  createRequestUrl = environment.apiUrl + '/requests/create';
  //URL to get full name of user
  getUserFullNameUrl = environment.apiUrl + '/user/fullname';
  //URL to update gp_user_id for patient
  updatePatientGPUrl = environment.apiUrl + '/patient/update';


  constructor(private http: HttpClient) { }

  //Gets a list of all GPs
  getGPs(): Observable<GP[]> {
    return this.http.get<GP[]>(this.getDoctorsUrl)
  }

  //Gets all requests for a specific GP
  getRequestsForGP(): Observable<RequestGP[]> {
    const url = `${this.getRequestsURL}/gp/${sessionStorage.getItem('user_id')}`;
    this.http.get<RequestGP[]>(url).subscribe(data => {
      this.requestLength = data.length
      console.log(this.requestLength);
    })

    return this.http.get<RequestGP[]>(url);
  }

  //Gets GP by patient's user id
  getGPByPatientUserId(user_id: number) {
    const url = `${this.getDoctorByUserId}/${user_id}`;
    return this.http.get<number>(url)
  }

  //Method for creating a request
  createRequest(requestGP: RequestGP): Observable<RequestGP> {
    console.log("Creating request...");
    return this.http.post<RequestGP>(this.createRequestUrl, requestGP)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Method for deleting a request
  deleteRequest(id: number): Observable<{}> {
    const url = `${this.getRequestsURL + "/delete"}/${id}`;
    return this.http.delete(url)
  }

  //Method for getting the full name by user id
  getFullName(id: number) {
    const url = `${this.getUserFullNameUrl}/${id}`;
    return this.http.get<string>(url);
  }

  //Method for updating the GP of a patient
  updateGP(gpUserId: number, userId: number) {
    const url = `${this.updatePatientGPUrl}/${userId}/${gpUserId}`
    return this.http.put(url, [userId, gpUserId,]);
  }

  //Method for handling errors
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
