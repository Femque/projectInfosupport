import {Component, OnInit} from '@angular/core';
import {Appointment} from "../../models/appointment";
import {CalendarService} from "./calendar.service";
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Observable} from "rxjs";
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { finalize } from "rxjs/operators";
import {log} from "util";

@Component({
  selector: 'app-calender',
  providers: [CalendarService],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {
  appointments: Appointment[];
  length: number;

  constructor(private calendarService: CalendarService) {
  }

  async ngOnInit() {
    this.appointments = [];
    await this.getAppointments();
    // this.createCalendar(this.appointments);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.calendarService.createAppointment(appointment)
  }

  createCalendar(appointments: any[]) {
    console.log('creating calendar');

    document.addEventListener('DOMContentLoaded', function () {
      const calendarEl = document.getElementById('calendar');

      let calendar = new Calendar(calendarEl, {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialDate: '2018-01-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
      });


      // 'title': data[i].patient_user_id,
      //   'description': data[i].description,
      //   'start': data[i].start_time,
      //   'allDay': false

      console.log("for");
      console.log(appointments);
      console.log(appointments.length);
      for (let i = 0; i < appointments.length; i++) {
        console.log(i);
        // calendar.addEvent(appointments[i].toJson());
      }

      calendar.render();
    });
  }

  async getAppointments(): Promise<any> {
    this.calendarService.getAppointments()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          // let startDateTime = new Date(data[i].start_time).toLocaleString();
          // let timeDateArray = startDateTime.split(" ");
          //
          // let startDateString = timeDateArray[0];
          // let datePieces = startDateString.split("-");
          // let startDate = datePieces[2] + "-" + datePieces[1] + "-" + datePieces[0];
          // let startTime = timeDateArray[1];

          // console.log(startDate);
          // console.log(startTime);

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

        }
      }, error => console.log(error));

    console.log("done getting appointments");
  }
}

