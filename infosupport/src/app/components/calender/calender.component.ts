import {Component, OnInit, ViewChild} from '@angular/core';
import {Appointment} from "../../models/appointment";
import {CalendarService} from "./calendar.service";
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Observable} from "rxjs";
import {CalendarOptions} from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import {Calendar_appointment} from "../../models/calendar_appointment";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {log} from "util";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-calender',
  providers: [CalendarService],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit {
  appointments: Calendar_appointment[] = [];
  closeResult = '';
  appointmentForm;

  @ViewChild('content')
  content;

  constructor(private calendarService: CalendarService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      title: '',
      description: '',
      location: '',
      start: '',
      end: '',
      is_digital: '',
      is_followup: ''
    })
  }

  async ngOnInit() {
    await this.getAppointments();
  }

  open() {
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async createCalendar(appointments: Calendar_appointment[]) {
    console.log('creating calendar');

    const calendarEl = document.getElementById('calendar');

    let calendar = new Calendar(calendarEl,

      {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          left: 'prev,next today add_event',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        customButtons: {
          add_event: {
            text: 'Nieuwe afspraak',
            click: () => this.open()
          }
        },
        eventClick: () => this.open(),
        height: 700,
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events,
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

  createAppointment(appointmentdata) {
    let appointment = new Appointment(123, appointmentdata.start, appointmentdata.end, appointmentdata.is_digital,
      appointmentdata.description, appointmentdata.location, appointmentdata.is_followup, 321, 123);
    console.log(appointment);
    this.calendarService.createAppointment(appointment)
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
