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
  appointments: Appointment[] = [];
  closeResult = '';
  appointmentForm;

  @ViewChild('create')
  create;

  constructor(private calendarService: CalendarService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      title: [''],
      description: [''],
      location: [''],
      start: [''],
      end: [''],
      is_digital: [false],
      is_followup: [false]
    })
  selectedAppointment: any;

  patient_user_id: number;
  location: string;
  start_time: Date;
  end_time: Date;
  is_follow_up: boolean;
  is_digital: boolean;
  description: string;
  big_code: number;
  appointment_code: number;

  @ViewChild('content')
  content;

  constructor(private calendarService: CalendarService, private modalService: NgbModal) {
  }

  async ngOnInit() {
    await this.getAppointments();
  }

  open() {
    this.modalService.open(this.create, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdate(event: any) {
    this.selectedAppointment = event;
    this.patient_user_id = event.patient_user_id
    this.location = event.location
    this.start_time = event.start_time
    this.end_time = event.end_time
    this.is_follow_up = event.is_follow_up
    this.is_digital = event.is_digital
    this.description = event.description
    this.big_code = event.big_code
    this.appointment_code = event.appointment_code

    console.log(event)
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  async createCalendar(appointments: Appointment[]) {
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
        eventClick: (event,) =>this.openUpdate(event.event._def.extendedProps),
        height: 700,
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events,
        eventDisplay: "block"
      });

    for (let i = 0; i < appointments.length; i++) {
      calendar.addEvent({
        title: appointments[i].patient_user_id.toLocaleString(),
        start: appointments[i].start_time,
        end: appointments[i].end_time,
        start_time: appointments[i].start_time,
        end_time: appointments[i].end_time,
        is_digital: appointments[i].is_digital,
        description: appointments[i].description,
        location: appointments[i].location,
        is_follow_up: appointments[i].is_follow_up,
        big_code: appointments[i].big_code,
        appointment_code: appointments[i].appointment_code,
        patient_user_id: appointments[i].patient_user_id
      });

    }
    calendar.render();

  }

  createAppointment(appointmentdata) {
    let appointment = new Appointment(appointmentdata.start, appointmentdata.end, appointmentdata.is_digital,
      appointmentdata.description, appointmentdata.location, appointmentdata.is_followup, 321, 123);
    console.log(appointment);
      this.calendarService.createAppointment(appointment)
      .subscribe( data => {
       let newAppointment = new Calendar_appointment(data.patient_user_id.toString(), data.start_time, data.end_time);
        this.appointments.push(newAppointment);
      })
  }

  async getAppointments() {
    this.calendarService.getAppointments()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          let appointmentsTest = new Appointment(data[i].appointment_code, data[i].start_time, data[i].end_time, data[i].is_digital,
            data[i].description, data[i].location, data[i].is_follow_up, data[i].big_code, data[i].patient_user_id)

          this.appointments.push(appointmentsTest);
        }
      }, error => console.log(error), () => this.createCalendar(this.appointments));
  }

  updateAppoitment(){
    let updatedAppointment = new Appointment(
      this.appointment_code,
      this.start_time,
      this.end_time,
      this.is_digital,
      this.description,
      this.location,
      this.is_follow_up,
      this.big_code,
      this.patient_user_id
    )
    console.log(updatedAppointment)
    console.log(this.location)
    this.calendarService.updateAppointment(updatedAppointment).subscribe(
      (data) => {}, (error) => {
        alert('HTTP Error: Status' + error.status+ '-' + error.message)
      }
    )
    this.modalService.dismissAll()
    window.location.reload()

  }

  deleteAppointment(){
    let deleted = new Appointment(
      this.appointment_code,
      this.start_time,
      this.end_time,
      this.is_digital,
      this.description,
      this.location,
      this.is_follow_up,
      this.big_code,
      this.patient_user_id
    )

    this.calendarService.deleteAppointment(deleted).subscribe(
      (data) => {}, (error) => {
        alert('HTTP Error: Status' + error.status+ '-' + error.message)
      }
    )
    this.modalService.dismissAll()
    window.location.reload()
  }
}
