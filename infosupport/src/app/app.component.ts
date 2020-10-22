import { Component } from '@angular/core';
// @ts-ignore
import { User } from '../../infoserver/src/main/java/app/models';
import {Router} from "@angular/router";
// import {LoginService} from "./components/login/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'infosupport';
  currentUser: User;

  constructor(
    private router: Router,
    // private loginService: LoginService
  ) {
    // this.loginService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    // this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
