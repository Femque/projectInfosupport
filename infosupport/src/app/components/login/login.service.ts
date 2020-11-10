import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, config, Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../models/user";

@Injectable({ providedIn: "root"})
export class LoginService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;
  private email;

  usersUrl = "http://localhost:8080/user";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public loginUserFromRemote(user: User):Observable<any> {
    sessionStorage.setItem('email', this.email)
    return this.http.post<any>(this.usersUrl + "/login" , user)
  }

  fetchUserId(email: String): Observable<number>{
    return this.http.post<number>(this.usersUrl + "/id" , email)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('email')
    // console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('email');
    this.userSubject.next(null);
  }


}
