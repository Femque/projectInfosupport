import {Component, OnInit} from '@angular/core';
import {Appointment} from "../../models/appointment";
import {CalendarService} from "./calendar.service";
import {DropDownList} from '@syncfusion/ej2-dropdowns';
import {DateTimePicker} from '@syncfusion/ej2-calendars';
import {L10n} from '@syncfusion/ej2-base';
import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  PopupOpenEventArgs
} from '@syncfusion/ej2-angular-schedule';


L10n.load({
  'en-US': {
    'schedule': {
      'addTitle': 'New appointment'
    }
  }
});

@Component({
  selector: 'app-calender',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, CalendarService],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {

  event: object[] = [
    {
      Id: 1,
      Patient: 'Jesse Bijma',
      Location: 'ZonneVeldt',
      Description: '',
      StartTime: new Date(2020, 9, 16, 1, 0),
      EndTime: new Date(2020, 9, 16, 3, 0),
    }, {
      Id: 2,
      Patient: 'Bram osborne',
      Location: 'ZonneVeldt',
      Description: '',
      StartTime: new Date(2020, 9, 16, 5, 0),
      EndTime: new Date(2020, 9, 16, 7, 0),

    }, {
      Id: 3,
      Patient: 'Femke Hofland',
      Location: 'ZonneVeldt',
      Description: '',
      StartTime: new Date(2020, 9, 16, 9, 0),
      EndTime: new Date(2020, 9, 16, 10, 0),
    }]


  // @ts-ignore
  public eventSettings: EventSettingsModel = {
    dataSource: this.event,
    fields: {
      id: 'Id',
      subject: {name: 'Patient', title: 'Patient'},
      location: {name: 'Location', title: 'Location'},
      description: {name: 'Description', title: 'Event Description'},
      startTime: {name: 'StartTime', title: 'Start Duration'},
      endTime: {name: 'EndTime', title: 'End Duration'},
    }
  };


  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
      if (!startElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker({value: new Date(startElement.value) || new Date()}, startElement);
      }
      let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
      if (!endElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker({value: new Date(endElement.value) || new Date()}, endElement);
      }
      let statusElement: HTMLInputElement = args.element.querySelector('#Patient') as HTMLInputElement;
      if (!statusElement.classList.contains('e-dropdownlist')) {
        let dropDownListObject: DropDownList = new DropDownList({
          dataSource: ['Jesse Bijlma', 'Bram Osborne', 'Femke Hofland', 'Faris Abahri'], value: statusElement.value
        });
        dropDownListObject.appendTo(statusElement);
        statusElement.setAttribute('Patient', 'Patient');
      }
    }
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

