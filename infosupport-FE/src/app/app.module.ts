import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalenderComponent } from './components/calender/calender.component';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentViewComponent } from './components/appointmentView/appointmentView.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from "./components/home/home.component";
import { MatGridListModule, MatGridTile } from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import { ErrorComponent } from './components/error/error.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from "./app-routing-module";
import {LoginComponent} from "./components/login/login.component";
import {FooterComponent} from "./components/footer/footer.component";
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid';
import { ChatComponent } from './components/chat/chat.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { MedicalFilesComponent } from './components/medical-files/medical-files.component';
import { PatientViewComponent } from './components/patient-view/patient-view.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { RequestGpComponent } from './components/request-gp/request-gp.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
]);

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {origin: '*:*'} };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalenderComponent,
    AppointmentComponent,
    AppointmentViewComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    FooterComponent,
    ChatComponent,
    PersonalInformationComponent,
    MedicalFilesComponent,
    PatientViewComponent,
    RequestGpComponent
  ],

  imports: [
    BrowserModule,
    BrowserModule,
    FullCalendarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule, RouterModule,
    AppRoutingModule, ReactiveFormsModule,
    SocketIoModule.forRoot(config), Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
