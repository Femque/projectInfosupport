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
  MonthService,
  AgendaService,
  PopupOpenEventArgs,
  View
} from '@syncfusion/ej2-angular-schedule';
import {Observable} from "rxjs";
import {log} from "util";


L10n.load({
  'en-US': {
    'schedule': {
      'addTitle': 'New appointment'
    }
  }
});

@Component({
  selector: 'app-calender',
  providers: [DayService, WeekService, MonthService, AgendaService, CalendarService],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.getAppointments();
    console.log("getting appointments");
    console.log(this.appointments);
  }


  appointments: Appointment[] = [];
  public scheduleViews: View[] = ['Day', 'Week', 'Month', 'Agenda'];




  // @ts-ignore
  public eventSettings: EventSettingsModel = {
    dataSource: this.appointments,
    fields: {
      id: 'Id',
      subject: {name: 'patient', title: 'Patient'},
      location: {name: 'location', title: 'Location'},
      description: {name: 'description', title: 'Event Description'},
      startTime: {name: 'startTime', title: 'Start Duration'},
      endTime: {name: 'endTime', title: 'End Duration'},
    },
  };


  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      let startElement: HTMLInputElement = args.element.querySelector('#startTime') as HTMLInputElement;
      if (!startElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker({value: new Date(startElement.value) || new Date()}, startElement);
      }
      let endElement: HTMLInputElement = args.element.querySelector('#endTime') as HTMLInputElement;
      if (!endElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker({value: new Date(endElement.value) || new Date()}, endElement);
      }
      let statusElement: HTMLInputElement = args.element.querySelector('#patient') as HTMLInputElement;
      if (!statusElement.classList.contains('e-dropdownlist')) {
        let dropDownListObject: DropDownList = new DropDownList({
          dataSource: ["Test patient 1","Test patient 2","Test patient 3","Test patient 4","Test patient 5"], value: statusElement.value
        });
        dropDownListObject.appendTo(statusElement);
        statusElement.setAttribute('patient', 'patient');
      }

    }
  }



  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.calendarService.createAppointment(appointment)
  }


  getAppointments(): any {
    this.calendarService.getAppointments()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          let newAppointment = new Appointment(
            data[i].id,
            data[i].patient,
            data[i].gp,
            data[i].startTime,
            data[i].endTime,
            data[i].description,
            data[i].location
          )
          this.appointments.push(newAppointment);
        }});
  }
}

