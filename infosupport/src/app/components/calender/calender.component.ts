import {Component, OnInit} from '@angular/core';
import {Appointment} from "../../models/appointment";
import {CalendarService} from "./calendar.service";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Observable} from "rxjs";

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

      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin]
      });

      calendar.render();
    });
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

