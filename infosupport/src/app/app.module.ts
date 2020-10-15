import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalenderComponent } from './components/calender/calender.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService,
  MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentComponent } from './components/appointment/appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalenderComponent,
    AppointmentComponent

  ],
  imports: [
    BrowserModule,
    ScheduleModule, RecurrenceEditorModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [DayService, WeekService, WorkWeekService,
    MonthService, MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
