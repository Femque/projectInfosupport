import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calender',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'RUSSIA vs SAUDI ARABIA',
        Description: 'Group A',
        StartTime: new Date(2018, 5, 14, 15, 0),
        EndTime: new Date(2018, 5, 14, 17, 0),
        StartTimezone: 'Europe/Moscow',
        EndTimezone: 'Europe/Moscow',
        City: 'Moscow',
        CategoryColor: '#1aaa55',
        GroupId: 1
      }, {
        Id: 2,
        Subject: 'EGYPT vs URUGUAY',
        Description: 'Group A',
        StartTime: new Date(2018, 5, 15, 12, 0),
        EndTime: new Date(2018, 5, 15, 14, 0),
        StartTimezone: 'Asia/Yekaterinburg',
        EndTimezone: 'Asia/Yekaterinburg',
        City: 'Ekaterinburg',
        CategoryColor: '#1aaa55',
        GroupId: 1
      }, {
        Id: 3,
        Subject: 'MOROCCO vs IR IRAN',
        Description: 'Group B',
        StartTime: new Date(2018, 5, 15, 15, 0),
        EndTime: new Date(2018, 5, 15, 17, 0),
        StartTimezone: 'Europe/Moscow',
        EndTimezone: 'Europe/Moscow',
        City: 'Saint Petersburg',
        CategoryColor: '#357cd2',
        GroupId: 2
      }, {
        Id: 4,
        Subject: 'PORTUGAL vs SPAIN',
        Description: 'Group B',
        StartTime: new Date(2018, 5, 15, 18, 0),
        EndTime: new Date(2018, 5, 15, 20, 0),
        StartTimezone: 'Europe/Moscow',
        EndTimezone: 'Europe/Moscow',
        City: 'Sochi',
        CategoryColor: '#357cd2',
        GroupId: 2
      }, {
        Id: 5,
        Subject: 'FRANCE vs AUSTRALIA',
        Description: 'Group C',
        StartTime: new Date(2018, 5, 16, 10, 0),
        EndTime: new Date(2018, 5, 16, 12, 0),
        StartTimezone: 'Europe/Moscow',
        EndTimezone: 'Europe/Moscow',
        City: 'Kazan',
        CategoryColor: '#7fa900',
        GroupId: 3
      }, {
        Id: 6,
        Subject: 'ARGENTINA vs ICELAND',
        Description: 'Group D',
        StartTime: new Date(2018, 5, 16, 13, 0),
        EndTime: new Date(2018, 5, 16, 15, 0),
        StartTimezone: 'Europe/Moscow',
        EndTimezone: 'Europe/Moscow',
        City: 'Moscow',
        CategoryColor: '#ea7a57',
        GroupId: 4
      }, {
        Id: 7,
        Subject: 'PERU vs DENMARK',
        Description: 'Group C',
        StartTime: new Date(2018, 5, 16, 16, 0),
        EndTime: new Date(2018, 5, 16, 18, 0),
        StartTimezone: 'Europe/Moscow',
        EndTimezone: 'Europe/Moscow',
        City: 'Saransk',
        CategoryColor: '#7fa900',
        GroupId: 3
      }, {
        Id: 8,
        Subject: 'CROATIA vs NIGERIA',
        Description: 'Group D',
        StartTime: new Date(2018, 5, 16, 19, 0),
        EndTime: new Date(2018, 5, 16, 21, 0),
        StartTimezone: 'Europe/Kaliningrad',
        EndTimezone: 'Europe/Kaliningrad',
        City: 'Kaliningrad',
        CategoryColor: '#ea7a57',
        GroupId: 4
      }]
  }



  constructor() { }

  ngOnInit(): void {
  }}

