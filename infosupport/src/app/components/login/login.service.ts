import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, config, Observable} from "rxjs";
import {User} from "../../infoserver/src/main/java/app/models";


@Injectable({ providedIn: "root"})
export class LoginService {
  public currentUser: Observable<User>;
  private _currentUser: BehaviorSubject<User>;

  constructor(
    private http: HttpClient) {
    this._currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this._currentUser.asObservable();
  }

  login(username, password){
    return this.http.post
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._currentUser.next(null);
  }
}
