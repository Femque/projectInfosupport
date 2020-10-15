import {Component, OnInit} from '@angular/core';
import {Config, ConfigService} from "../../config/config.service";
import {Appointment} from "../../models/appointment";
import {CalendarService} from "./calendar.service";

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
    console.log("getting appointments");
    this.getAppointments();
  }

  getAppointments(): void {
    this.calendarService.getAppointments()
      .subscribe(appointments => (this.appointments = appointments));
  }

}
