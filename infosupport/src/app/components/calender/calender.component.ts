// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {Appointment} from "../../models/appointment";
// @ts-ignore
import {CalendarService} from "./calendar.service";
import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService
} from '@syncfusion/ej2-angular-schedule';
import {Observable} from "rxjs";

@Component({
  selector: 'app-calender',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, CalendarService],
  // templateUrl: './calender.component.html',
  template: '<ejs-schedule  [eventSettings]="eventSettings" height="500" width="800"></ejs-schedule>',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {

  appointments: Appointment[] = [];
  event: object[] = [
    {
      Id: 1,
      Subject: 'RUSSIA vs SAUDI ARABIA',
      Description: 'Group A',
      StartTime: new Date(2020, 9, 16, 14, 0),
      EndTime: new Date(2020, 9, 16, 17, 0),
      StartTimezone: 'Europe/Moscow',
      EndTimezone: 'Europe/Moscow',
      City: 'Moscow',
      CategoryColor: '#1aaa99',
      GroupId: 1
    }, {
      Id: 2,
      Subject: 'EGYPT vs URUGUAY',
      Description: 'Group A',
      StartTime: new Date(2020, 9, 16, 12, 0),
      EndTime: new Date(2020, 9, 16, 14, 0),
      StartTimezone: 'Asia/Yekaterinburg',
      EndTimezone: 'Asia/Yekaterinburg',
      City: 'Ekaterinburg',
      CategoryColor: '#1aaa99',
      GroupId: 1
    }, {
      Id: 3,
      Subject: 'MOROCCO vs IR IRAN',
      Description: 'Group B',
      StartTime: new Date(2020, 9, 16, 4, 0),
      EndTime: new Date(2020, 9, 16, 17, 0),
      StartTimezone: 'Europe/Moscow',
      EndTimezone: 'Europe/Moscow',
      City: 'Saint Petersburg',
      CategoryColor: '#397cd2',
      GroupId: 2}]


  public eventSettings: EventSettingsModel = {
    dataSource: this.appointments
  }

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    console.log("getting appointments");
    this.getAppointments();
    console.log(this.appointments);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.calendarService.createAppointment(appointment)
  }

  getAppointments(): void {
     this.calendarService.getAppointments()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          this.appointments.push(data[i]);
        }
      });
  }
}

