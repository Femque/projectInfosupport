import {Component, OnInit, ViewChild} from '@angular/core';
import {Appointment} from '../../models/appointment';
import {CalendarService} from './calendar.service';
import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Observable} from 'rxjs';
import {CalendarOptions} from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import {Calendar_appointment} from '../../models/calendar_appointment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {log} from 'util';
import {FormBuilder} from '@angular/forms';

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
  patients: Array<string> = [];

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
  title: string;

  @ViewChild('create')
  create;
  @ViewChild('content')
  content;

  constructor(private calendarService: CalendarService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      title: [''],
      description: [''],
      location: [''],
      start: [''],
      end: [''],
      is_digital: [false],
      is_followup: [false]
    });
  }

  ngOnInit() {
    this.getBigCode(sessionStorage.getItem('user_id'));
    this.getPatients(sessionStorage.getItem('user_id'));
    this.getAppointments();
  }

  selected(e) {
    this.title = e;
  }

  open() {
    this.modalService.open(this.create, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdate(event: any) {
    this.selectedAppointment = event;
    this.patient_user_id = event.patient_user_id;
    this.location = event.location;
    this.start_time = event.start_time;
    this.end_time = event.end_time;
    this.is_follow_up = event.is_follow_up;
    this.is_digital = event.is_digital;
    this.description = event.description;
    this.big_code = event.big_code;
    this.appointment_code = event.appointment_code;
    this.title = event.titlePatient;

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
        eventClick: (event,) => this.openUpdate(event.event._def.extendedProps),
        height: 700,
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events,
        eventDisplay: 'block',
        contentHeight: 'auto',
        eventBackgroundColor: "#57BA94"
      });

    for (let i = 0; i < appointments.length; i++) {
      calendar.addEvent({
        title: appointments[i].title,
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
        patient_user_id: appointments[i].patient_user_id,
        titlePatient: appointments[i].title
      });

    }
    calendar.render();

  }

  createAppointment(appointmentdata) {
    let appointment = new Appointment(appointmentdata.start, appointmentdata.end, appointmentdata.is_digital,
      appointmentdata.description, appointmentdata.location, appointmentdata.is_followup, parseInt(sessionStorage.getItem("big_code")), 123, appointmentdata.title);
    this.calendarService.createAppointment(appointment)
      .subscribe(data => {
        this.appointments = [];
        this.getAppointments();

      });

    this.modalService.dismissAll();
  }


  getAppointments() {
    this.calendarService.getAppointmentsGp(parseInt(sessionStorage.getItem("big_code")))
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {

          let appointmentsTest = new Appointment(data[i].start_time, data[i].end_time, data[i].is_digital,
            data[i].description, data[i].location, data[i].is_follow_up, data[i].big_code, data[i].patient_user_id, data[i].title, data[i].appointment_code);

          this.appointments.push(appointmentsTest);
        }
      }, error => console.log(error), () => this.createCalendar(this.appointments));
  }

  updateAppoitment() {
    let updatedAppointment = new Appointment(
      this.start_time,
      this.end_time,
      this.is_digital,
      this.description,
      this.location,
      this.is_follow_up,
      this.big_code,
      this.patient_user_id,
      this.title,
      this.appointment_code
    );
    this.calendarService.updateAppointment(updatedAppointment).subscribe(
      (data) => {
      }, (error) => {
        alert('HTTP Error: Status' + error.status + '-' + error.message);
      }
    );


    this.modalService.dismissAll();
    window.location.reload()

  }

  deleteAppointment() {
    this.calendarService.deleteAppointment(this.appointment_code).subscribe(
      (data) => {
      }, (error) => {
        alert('HTTP Error: Status' + error.status + '-' + error.message);
      }
    );
    this.modalService.dismissAll();
    window.location.reload();
  }

  cancelUpdate() {
    this.modalService.dismissAll();
  }

  getBigCode(user_id) {
    this.calendarService.getBigCode(user_id).subscribe( data => {
      sessionStorage.setItem("big_code", JSON.stringify(data))
      console.log("big code = " + sessionStorage.getItem("big_code"));
    });
  }

  getPatients(gp_user_id) {
    this.calendarService.getPatientsForGp(gp_user_id).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let test = data[i].split(',');
        let test2 = test[0] + ' ' + test[1];
        this.patients.push(test2);
      }
    });

    return this.patients;
  }

  setTitle(title: string) {
    this.title = title;
  }
}
