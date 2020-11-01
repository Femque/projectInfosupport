import {Component, OnInit} from '@angular/core';
import {Appointment} from "../../models/appointment";
import {CalendarService} from "./calendar.service";
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Observable} from "rxjs";
import {CalendarOptions} from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import {finalize} from "rxjs/operators";
import {log} from "util";
import {forEachComment} from "tslint";
import {formatI18nPlaceholderName} from "@angular/compiler/src/render3/view/i18n/util";
import {ArrayDataSource} from "@angular/cdk/collections";
import {isElementScrolledOutsideView} from "@angular/cdk/overlay/position/scroll-clip";
import {url} from "inspector";
import {Calendar_appointment} from "../../models/calendar_appointment";

@Component({
  selector: 'app-calender',
  providers: [CalendarService],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {
  appointments: Calendar_appointment[] = [];
  length: number;

  constructor(private calendarService: CalendarService) {
  }

  async ngOnInit() {
    await this.getAppointments();
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.calendarService.createAppointment(appointment)
  }

  async createCalendar(appointments: Calendar_appointment[]) {
    console.log('creating calendar');
    // console.log(appointments[0]);
    console.log(appointments.length);

    const calendarEl = document.getElementById('calendar');

    let calendar = new Calendar(calendarEl,

      {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        height: 500,
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
      });

    for (let i = 0; i < appointments.length; i++) {

      console.log(event);
      let date = new Date(appointments[i].start.toString() + 'T00:00:00');

      console.log("date = " + date);

      calendar.addEvent({
        title: appointments[i].title,
        start: date,
        allDay: true
      });

      calendar.render();
    }
  }


  async getAppointments() {
    this.calendarService.getAppointments()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          let startDateTime = new Date(data[i].start_time).toLocaleString();
                    let timeDateArray = startDateTime.split(" ");

          let test = timeDateArray[0].split("/");
          let test3 = test[2].split(",");
          let test2 = test3[0] + "-" + test[1] + "-" + test[0];
          console.log(test2);

          let appointmentsTest = new Calendar_appointment(data[i].patient_user_id.toString(), test2, data[i].end_time.toString());

          this.appointments.push(appointmentsTest);
        }
      }, error => console.log(error), () => this.createCalendar(this.appointments));
  }
}

