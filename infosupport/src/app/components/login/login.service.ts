import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({ providedIn: "root"})
export class LoginService {
  public currentUser;

  constructor(
    private http: HttpClient ) {
  }

  login(username, password){
    return this.http.post
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
