import {Component, OnInit} from '@angular/core';
import {Appointment} from "../../models/appointment";
import {CalendarService} from "./calendar.service";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Observable} from "rxjs";
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calender',
  providers: [CalendarService],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {

  appointments: Appointment[];


  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
      this.createCalendar();
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.calendarService.createAppointment(appointment)
  }

  createCalendar() {
    document.addEventListener('DOMContentLoaded', function() {
      const calendarEl = document.getElementById('calendar');

      let calendar = new Calendar(calendarEl, {
        plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialDate: '2018-01-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: [
          {
            title: 'All Day Event',
            start: '2018-01-01',
          },
          {
            groupId: '999',
            title: 'Repeating Event',
            start: '2018-01-09T16:00:00'
          },
          {
            groupId: '999',
            title: 'Repeating Event',
            start: '2018-01-16T16:00:00'
          },
          {
            title: 'Conference',
            start: '2018-01-11',
            end: '2018-01-13'
          },
          {
            title: 'Meeting',
            start: '2018-01-12T10:30:00',
            end: '2018-01-12T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2018-01-12T12:00:00'
          },
          {
            title: 'Meeting',
            start: '2018-01-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2018-01-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2018-01-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2018-01-13T07:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2018-01-28'
          }
        ]
      });

      calendar.render();
    });
  }

  // getAppointments(): any {
  //   this.calendarService.getAppointments()
  //     .subscribe(data => {
  //       for (let i = 0; i < data.length; i++) {
  //         let newAppointment = new Appointment(
  //           data[i].id,
  //           data[i].patient,
  //           data[i].gp,
  //           data[i].startTime,
  //           data[i].endTime,
  //           data[i].description,
  //           data[i].location
  //         )
  //         this.appointments.push(newAppointment);
  //       }});
  // }
}

