import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, config, Observable} from "rxjs";
import {Router} from "@angular/router";



@Injectable({ providedIn: "root"})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(data): Observable<any> {
    return this.http.post(`$http://localhost:8080/users/login`, data)
  }

}
