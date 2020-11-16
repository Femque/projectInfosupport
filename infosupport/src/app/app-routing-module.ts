import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ErrorComponent} from "./components/error/error.component";
import {LoginComponent} from "./components/login/login.component";
import {Appointment} from "./models/appointment";
import {AppointmentComponent} from "./components/appointment/appointment.component";
import {AppointmentViewComponent} from "./components/appointmentView/appointmentView.component";
import {CalenderComponent} from "./components/calender/calender.component";
import {FullCalendarModule} from "@fullcalendar/angular";
import {ChatComponent} from './components/chat/chat.component';
import {PersonalInformationComponent} from './components/personal-information/personal-information.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'appointment',
    component: AppointmentComponent
  },
  {
    path: 'appointmentView',
    component: AppointmentViewComponent
  },
  {
    path: 'personalView',
    component: PersonalInformationComponent
  },
  {
    path: 'calender',
    component: CalenderComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
