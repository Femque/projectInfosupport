import { Component } from '@angular/core';
// @ts-ignore
import { User } from '../../infoserver/src/main/java/app/models';
import {Router} from "@angular/router";
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
// import {LoginService} from "./components/login/login.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'infosupport';
  currentUser: User;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  constructor(
    private router: Router
  ) { }

  logout() {
    // this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
