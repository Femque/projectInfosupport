import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalenderComponent } from './components/calender/calender.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WorkWeekService,
  MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalenderComponent,
    AppointmentComponent,
    HomeComponent,
    ErrorComponent,


  ],

    imports: [
        BrowserModule,
        ScheduleModule, RecurrenceEditorModule,
        BrowserModule,
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
        AppRoutingModule

    ],
  providers: [DayService, WorkWeekService,
    MonthService, MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
