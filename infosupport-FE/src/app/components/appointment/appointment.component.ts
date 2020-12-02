import {Component, OnInit, ViewChild} from '@angular/core';
import {AppointmentService} from './appointment.service';
import {Appointment} from '../../models/appointment';
import DateTimeFormat = Intl.DateTimeFormat;
import {FormBuilder} from '@angular/forms';
import {error} from '@angular/compiler/src/util';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointmentForm;
  GpuserId: number;
  fullName: string;

  public errorMessage: string;
  public successMessage: string;
  public message: string;

  constructor(private appointmentService: AppointmentService, private formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      description: [''],
      start: [''],
      is_digital: [false],
    });
  }

  ngOnInit(): void {
    this.getGpUser_id(sessionStorage.getItem('user_id'));
    this.getFullNameById();
  }

  createAppointment(appointmentData) {
    this.errorMessage = 'Er is iets fout gegaan';
    this.successMessage = '';

    //Endtime calculation by adding 15 minutes to the starttime.
    var startTime = new Date(Date.parse(appointmentData.start));
    var endTime = new Date(startTime.getTime() + 15 * 60000);

    //Gets user id
    let userId = parseInt(sessionStorage.getItem('user_id'));

    //
    var fullNameArray = this.fullName[0].split(",");
    var firstName = fullNameArray[0];
    var lastName = fullNameArray[1];

    let appointment = new Appointment(startTime, endTime, appointmentData.is_digital,
      appointmentData.description, 'Zonnevelt Huisartsenpost',
      false, this.GpuserId, userId, firstName + " " + lastName
    );
    console.log(appointment);
    this.appointmentService.createAppointment(appointment)
      .subscribe((createdAppointment: Appointment) => {
          const appointmentDate = new Date(appointment.start_time).toLocaleString();
          this.successMessage = `Succesvol geboekt`;
        })
  }

  getGpUser_id(user_id) {
    this.appointmentService.getGPUSerId(user_id).subscribe(data => {
      this.GpuserId = data
    });
  }

  getFullNameById() {
    this.appointmentService.getFullName().subscribe(data => {
      this.fullName = data
    });
  }
}
