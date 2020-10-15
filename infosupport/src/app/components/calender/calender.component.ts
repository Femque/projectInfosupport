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

@Component({
  selector: 'app-calender',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, CalendarService],
  // templateUrl: './calender.component.html',
  template: '<ejs-schedule  [eventSettings]="eventSettings" height="500" width="800"></ejs-schedule>',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {

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
    // }, {
    //   Id: 4,
    //   Subject: 'PORTUGAL vs SPAIN',
    //   Description: 'Group B',
    //   StartTime: new Date(2020, 9, 19, 18, 0),
    //   EndTime: new Date(2020, 9, 19, 20, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Sochi',
    //   CategoryColor: '#397cd2',
    //   GroupId: 2
    // }, {
    //   Id: 9,
    //   Subject: 'FRANCE vs AUSTRALIA',
    //   Description: 'Group C',
    //   StartTime: new Date(2020, 9, 16, 10, 0),
    //   EndTime: new Date(2020, 9, 16, 12, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Kazan',
    //   CategoryColor: '#7fa900',
    //   GroupId: 3
    // }, {
    //   Id: 6,
    //   Subject: 'ARGENTINA vs ICELAND',
    //   Description: 'Group D',
    //   StartTime: new Date(2020, 9, 16, 13, 0),
    //   EndTime: new Date(2020, 9, 16, 19, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Moscow',
    //   CategoryColor: '#ea7a97',
    //   GroupId: 4
    // }, {
    //   Id: 7,
    //   Subject: 'PERU vs DENMARK',
    //   Description: 'Group C',
    //   StartTime: new Date(2020, 9, 16, 16, 0),
    //   EndTime: new Date(2020, 9, 16, 18, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Saransk',
    //   CategoryColor: '#7fa900',
    //   GroupId: 3
    // }, {
    //   Id: 8,
    //   Subject: 'CROATIA vs NIGERIA',
    //   Description: 'Group D',
    //   StartTime: new Date(2020, 9, 16, 19, 0),
    //   EndTime: new Date(2020, 9, 16, 21, 0),
    //   StartTimezone: 'Europe/Kaliningrad',
    //   EndTimezone: 'Europe/Kaliningrad',
    //   City: 'Kaliningrad',
    //   CategoryColor: '#ea7a97',
    //   GroupId: 4
    // }, {
    //   Id: 9,
    //   Subject: 'COSTA RICA vs SERBIA',
    //   Description: 'Group E',
    //   StartTime: new Date(2020, 9, 17, 12, 0),
    //   EndTime: new Date(2020, 9, 17, 14, 0),
    //   StartTimezone: 'Europe/Samara',
    //   EndTimezone: 'Europe/Samara',
    //   City: 'Samara',
    //   CategoryColor: '#00bdae',
    //   GroupId: 9
    // }, {
    //   Id: 10,
    //   Subject: 'GERMANY vs MEXICO',
    //   Description: 'Group F',
    //   StartTime: new Date(2020, 9, 17, 19, 0),
    //   EndTime: new Date(2020, 9, 17, 17, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Moscow',
    //   CategoryColor: '#f97f17',
    //   GroupId: 6
    // }, {
    //   Id: 11,
    //   Subject: 'BRAZIL vs SWITZERLAND',
    //   Description: 'Group E',
    //   StartTime: new Date(2020, 9, 17, 18, 0),
    //   EndTime: new Date(2020, 9, 17, 20, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Rostov-On-Don',
    //   CategoryColor: '#00bdae',
    //   GroupId: 9
    // }, {
    //   Id: 12,
    //   Subject: 'SWEDEN vs KOREA REPUBLIC',
    //   Description: 'Group F',
    //   StartTime: new Date(2020, 9, 18, 12, 0),
    //   EndTime: new Date(2020, 9, 18, 14, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Nizhny Novgorod',
    //   CategoryColor: '#f97f17',
    //
    // }, {
    //   Id: 13,
    //   Subject: 'BELGIUM vs PANAMA',
    //   Description: 'Group G',
    //   StartTime: new Date(2020, 9, 18, 19, 0),
    //   EndTime: new Date(2020, 9, 18, 17, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Sochi',
    //   CategoryColor: '#8e24aa',
    //   GroupId: 7
    // }, {
    //   Id: 14,
    //   Subject: 'TUNISIA vs ENGLAND',
    //   Description: 'Group G',
    //   StartTime: new Date(2020, 9, 18, 18, 0),
    //   EndTime: new Date(2020, 9, 18, 20, 0),
    //   StartTimezone: 'Europe/Volgograd',
    //   EndTimezone: 'Europe/Volgograd',
    //   City: 'Volgograd',
    //   CategoryColor: '#8e24aa',
    //   GroupId: 7
    // }, {
    //   Id: 19,
    //   Subject: 'COLOMBIA vs JAPAN',
    //   Description: 'Group H',
    //   StartTime: new Date(2020, 9, 19, 12, 0),
    //   EndTime: new Date(2020, 9, 19, 14, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Saransk',
    //   CategoryColor: '#7fa900',
    //   GroupId: 8
    // }, {
    //   Id: 16,
    //   Subject: 'POLAND vs SENEGAL',
    //   Description: 'Group H',
    //   StartTime: new Date(2020, 9, 19, 19, 0),
    //   EndTime: new Date(2020, 9, 19, 17, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Moscow',
    //   CategoryColor: '#7fa900',
    //   GroupId: 8
    // }, {
    //   Id: 17,
    //   Subject: 'RUSSIA vs EGYPT',
    //   Description: 'Group A',
    //   StartTime: new Date(2020, 9, 19, 18, 0),
    //   EndTime: new Date(2020, 9, 19, 20, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Saint Petersburg',
    //   CategoryColor: '#1aaa99',
    //   GroupId: 1
    // }, {
    //   Id: 18,
    //   Subject: 'PORTUGAL vs MOROCCO',
    //   Description: 'Group B',
    //   StartTime: new Date(2020, 9, 20, 12, 0),
    //   EndTime: new Date(2020, 9, 20, 14, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Rostov-On-Don',
    //   CategoryColor: '#397cd2',
    //   GroupId: 2
    // }, {
    //   Id: 19,
    //   Subject: 'URUGUAY vs SAUDI ARABIA',
    //   Description: 'Group A',
    //   StartTime: new Date(2020, 9, 20, 19, 0),
    //   EndTime: new Date(2020, 9, 20, 17, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Moscow',
    //   CategoryColor: '#1aaa99',
    //   GroupId: 1
    // }, {
    //   Id: 20,
    //   Subject: 'IR IRAN vs SPAIN',
    //   Description: 'Group B',
    //   StartTime: new Date(2020, 9, 20, 18, 0),
    //   EndTime: new Date(2020, 9, 20, 20, 0),
    //   StartTimezone: 'Europe/Moscow',
    //   EndTimezone: 'Europe/Moscow',
    //   City: 'Kazan',
    //   CategoryColor: '#397cd2',
    //   GroupId: 2
    // }, {
    //   Id: 21,
    //   Subject: 'DENMARK vs AUSTRALIA',
    //   Description: 'Group C',
    //   StartTime: new Date(2020, 9, 21, 12, 0),
    //   EndTime: new Date(2020, 9, 21, 14, 0),
    //   StartTimezone: 'Europe/Samara',
    //   EndTimezone: 'Europe/Samara',
    //   City: 'Samara',
    //   CategoryColor: '#7fa900',
    //   GroupId: 3
    // }, {
    //   Id: 22,
    //   Subject: 'FRANCE vs PERU',
    //   Description: 'Group D',
    //   StartTime: new Date(2020, 9, 21, 19, 0),
    //   EndTime: new Date(2020, 9, 21, 17, 0),
    //   StartTimezone: 'Asia/Yekaterinburg',
    //   EndTimezone: 'Asia/Yekaterinburg',
    //   City: 'Ekaterinburg',
    //   CategoryColor: '#ea7a97',
    //   GroupId: 4
    // }]




  public eventSettings: EventSettingsModel = {
    dataSource: this.event
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

