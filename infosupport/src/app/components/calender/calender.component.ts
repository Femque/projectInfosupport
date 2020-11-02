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

    const calendarEl = document.getElementById('calendar');

    let calendar = new Calendar(calendarEl,

      {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek add_events'
        },
        height: 700,
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events,
        customButtons: {
          add_events: {
            text: 'Afspraak toevoegen',
            click: function () {
              alert()
            },
          }
        }
      });

    for (let i = 0; i < appointments.length; i++) {

      calendar.addEvent({
        title: appointments[i].title,
        start: appointments[i].start,
        end: appointments[i].end
      });

      calendar.render();
    }
  }


  async getAppointments() {
    this.calendarService.getAppointments()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          let appointmentsTest = new Calendar_appointment(data[i].patient_user_id.toString(), data[i].start_time, data[i].end_time);

          this.appointments.push(appointmentsTest);
        }
      }, error => console.log(error), () => this.createCalendar(this.appointments));
  }
}

