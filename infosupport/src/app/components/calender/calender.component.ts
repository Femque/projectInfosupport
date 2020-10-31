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

@Component({
  selector: 'app-calender',
  providers: [CalendarService],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {
  ListofList: [] = [];
  length: number;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 500,
    eventSources: this.getAppointments()


  };


  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    // this.createCalendar(this.ListofList);
    console.log(this.getAppointments())
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.calendarService.createAppointment(appointment)
  }

  // createCalendar(appointments: []) {
  //   console.log('creating calendar');
  //
  //   document.addEventListener('DOMContentLoaded', function () {
  //     const calendarEl = document.getElementById('calendar');
  //
  //
  //     let calendar = new Calendar(calendarEl,
  //
  //       {
  //         plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
  //         headerToolbar: {
  //           left: 'prev,next today',
  //           center: 'title',
  //           right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  //         },
  //         height: 500,
  //         navLinks: true, // can click day/week names to navigate views
  //         editable: true,
  //         dayMaxEvents: true, // allow "more" link when too many events
  //       });
  //
  //
  //     // 'title': data[i].patient_user_id,
  //     //   'description': data[i].description,
  //     //   'start': data[i].start_time,
  //     //   'allDay': false
  //
  //     // console.log("for");
  //     console.log(appointments);
  //     console.log(appointments.length)
  //
  //     // for (let i = 0; i < appointments.length; i++) {
  //     //   console.log(i);
  //     // calendar.addEvent(appointments[i].toJson());
  //     // }
  //
  //     calendar.render();
  //   });
  // }


  getAppointments() : [] {
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

          // let newAppointment = new Appointment(
          //   data[i].appointment_code,
          //   data[i].start_time,
          //   data[i].end_time,
          //   data[i].is_digital,
          //   data[i].description,
          //   data[i].location,
          //   data[i].is_follow_up,
          //   data[i].big_code,
          //   data[i].patient_user_id
          // )

          let appointmentsTest = [{
            title: data[i].patient_user_id,
            start: data[i].start_time,
            end: data[i].end_time
          }]

          // @ts-ignore
          this.ListofList[i] = (appointmentsTest);
        }
      }, error => console.log(error));

    console.log("done getting appointments");
    return this.ListofList;

  }
}

