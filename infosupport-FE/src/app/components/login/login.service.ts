import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {User} from "../../models/user";
import {catchError} from "rxjs/operators";
import {Patient} from '../../models/patient';
import {GP} from "../../models/gp";

/**
 * Login Service - helps with the login, session storage and retrieving user data
 */

@Injectable({providedIn: "root"})
export class LoginService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  usersUrl = "http://localhost:8080/user";
  patientUrl = "http://localhost:8080/patient";
  gpUrl = "http://localhost:8080/doctor/user_id";

  constructor(
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user_id')));
    this.user = this.userSubject.asObservable();
  }

  /**
   * Sends post request to back end to login and return the user
   * @param user
   */
  public loginUserFromRemote(user: User): Observable<any> {
    return this.http.post<any>(this.usersUrl + "/login", user)
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends get request to back end to fetch the user_id using the email
   * @param email
   */
  public fetchUserId(email: string): Observable<number> {
    return this.http.get<number>(`${this.usersUrl + "/id"}?email=${email}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Sends get request to the back end to fetch the role using the email
   * @param email
   */
  public getUserRole(email: string): Observable<boolean> {
    let role = this.http.get<boolean>(`${this.usersUrl + "/role"}?email=${email}`)
      .pipe(catchError(this.handleError));

    return role;
  }

  /**
   * Get request to get patient data by using user_id
   */
  getUserInfoById(): Observable<User[]> {
    const url = `${this.usersUrl}/${sessionStorage.getItem('user_id')}`;
    return this.http.get<Patient[]>(url)
  }

  /**
   * Get request to get patient data by using user_id
   */
  getPatientInfoById(): Observable<Patient[]> {
    const url = `${this.patientUrl}/${sessionStorage.getItem('user_id')}`;
    return this.http.get<Patient[]>(url)
  }

  /**
   * Get request to get the data from the doctor by using the user_id
   */
  getGPInfoById(): Observable<GP[]> {
    const url = `${this.gpUrl}/${sessionStorage.getItem('user_id')}`;
    return this.http.get<GP[]>(url)

  }

  /**
   * Put request to update the patients data in the back end
   * @param patient
   */
  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(this.patientUrl + '/update', patient)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Put request to update the user data in the back end
   * @param user
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.usersUrl + '/update', user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Checks if a user is logged in by checking the session storage for user_id
   */
  isUserLoggedIn() {
    let user = sessionStorage.getItem('user_id');
    return !(user === null)
  }

  /**
   * Handles the log out by removing the user_id from the session storage
   */
  logOut() {
    sessionStorage.removeItem('user_id');
    window.sessionStorage.clear();
    this.userSubject.next(null);
  }

  /**
   * Get request to get and return patients that are assigned to a doctor with the gp_user_id
   * @param gp_user_id
   */
  getPatientsForGp(gp_user_id: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientUrl + "/gpChat/" + gp_user_id);
  }

  /**
   * Get request to get and return the patient with the id
   * @param id
   */
  findById(id: number): Observable<Patient[]> {
    const url = `${this.patientUrl}/${id}`;
    return this.http.get<Patient[]>(url);
  }

  /**
   * Handles different kind of errors which might occur
   * @param error
   * @private
   */
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
