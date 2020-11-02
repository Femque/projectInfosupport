import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, config, Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../models/user";

@Injectable({ providedIn: "root"})
export class LoginService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  usersUrl = 'http://localhost:8080/user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  authenticate(username, password) {
    if (username === "" && password === "") {
      sessionStorage.setItem('username', username)
      return this.http.post<User>(this.usersUrl + "/login", username);
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    // console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username');
    this.userSubject.next(null);
  }
}
