import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalenderComponent } from './components/calender/calender.component';
<<<<<<< HEAD
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService,
  MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
=======
import { HttpClientModule } from '@angular/common/http';
import { AppointmentComponent } from './components/appointment/appointment.component';
>>>>>>> ad76ae449cadab2df53b1cd15d20ed6555b503ff

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
<<<<<<< HEAD
    CalenderComponent
  ],
  imports: [
    BrowserModule,
    ScheduleModule, RecurrenceEditorModule
=======
    CalenderComponent,
    AppointmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
>>>>>>> ad76ae449cadab2df53b1cd15d20ed6555b503ff
  ],
  providers: [DayService, WeekService, WorkWeekService,
    MonthService, MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
