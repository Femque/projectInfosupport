import {Component, OnInit} from '@angular/core';
import {Appointment} from "../../models/appointment";
import {CalendarService} from "./calendar.service";
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calender',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, CalendarService],
  // templateUrl: './calender.component.html',
  template: '<ejs-schedule [eventSettings]="eventSettings"></ejs-schedule>',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {

  public data: object[] = [{
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2018, 1, 15, 10, 0),
    EndTime: new Date(2018, 1, 15, 12, 30)
  }];
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  }




  appointments: Appointment[];

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    console.log("getting appointments");
    this.getAppointments();
  }

  getAppointments(): void {
    this.calendarService.getAppointments()
      .subscribe(appointments => (this.appointments = appointments));
  }
}

