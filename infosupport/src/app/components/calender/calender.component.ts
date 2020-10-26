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
      id: 'appointment_code',
      subject: {name: 'patient_user_id', title: 'Patient'},
      location: {name: 'location', title: 'Location'},
      description: {name: 'description', title: 'Event Description'},
      startTime: {name: 'start_time', title: 'Start Duration'},
      endTime: {name: 'end_time', title: 'End Duration'},
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
          dataSource: ["321", "456"], value: statusElement.value
        });
        dropDownListObject.appendTo(statusElement);
        statusElement.setAttribute('patient', 'patient_user_id');
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
            data[i].appointment_code,
            data[i].start_time,
            data[i].end_time,
            data[i].is_digital,
            data[i].description,
            data[i].location,
            data[i].is_follow_up,
            data[i].big_code,
            data[i].patient_user_id
          )
          this.appointments.push(newAppointment);
        }});
  }
}

