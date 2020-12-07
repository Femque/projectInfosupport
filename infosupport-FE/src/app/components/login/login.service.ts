import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {BehaviorSubject, config, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {catchError} from "rxjs/operators";
import {Appointment} from '../../models/appointment';
import {Patient} from '../../models/patient';
import {GP} from "../../models/gp";

export interface booleanReturn {
  retData: boolean;
}

@Injectable({providedIn: "root"})
export class LoginService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  usersUrl = "http://localhost:8080/user";
  patientUrl = "http://localhost:8080/patient";
  gpUrl = "http://localhost:8080/doctor/user_id";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user_id')));
    this.user = this.userSubject.asObservable();
  }

  public loginUserFromRemote(user: User): Observable<any> {
    return this.http.post<any>(this.usersUrl + "/login", user)
      .pipe(catchError(this.handleError));
  }

  public fetchUserId(email: string): Observable<number> {
    return this.http.get<number>(`${this.usersUrl + "/id"}?email=${email}`)
      .pipe(catchError(this.handleError));
  }

  public getUserRole(email: string): Observable<boolean> {
    let role = this.http.get<boolean>(`${this.usersUrl + "/role"}?email=${email}`)
      .pipe(catchError(this.handleError));

    return role;
  }

  //getting patient Info
  getPatientInfoById(): Observable<Patient[]> {
    // return this.http.get<Appointment[]>${this.getAppointmentsByIdUrl}/${sessionStorage.getItem('user_id')}
    const url = `${this.patientUrl}/${sessionStorage.getItem('user_id')}`; // DELETE api/heroes/42
    console.log(url);
    return this.http.get<Patient[]>(url)
    console.log(sessionStorage.getItem('user_id')+ 'efkwefpowekfpokop');

  }

  //getting Doctor Info
  getGPInfoById(): Observable<GP[]> {
    // return this.http.get<Appointment[]>${this.getAppointmentsByIdUrl}/${sessionStorage.getItem('user_id')}
    console.log("in get gp method");
    console.log(sessionStorage.getItem('user_id'));
    const url = `${this.gpUrl}/${sessionStorage.getItem('user_id')}`; // DELETE api/heroes/42
    console.log(url);
    return this.http.get<GP[]>(url)
    console.log(sessionStorage.getItem('user_id')+ 'efkwefpowekfpokop');

  }

  updatePatient(patient: Patient): Observable<Patient>{
    console.log(patient);
    return this.http.put<Patient>( this.patientUrl + '/update', patient)
      .pipe(
        catchError(this.handleError)
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('user_id')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('user_id');
    window.sessionStorage.clear()
    this.userSubject.next(null);
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
