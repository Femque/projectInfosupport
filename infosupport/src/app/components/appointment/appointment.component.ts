import {Component, OnInit, ViewChild} from '@angular/core';
import {AppointmentService} from './appointment.service';
import {Appointment} from '../../models/appointment';
import DateTimeFormat = Intl.DateTimeFormat;
import {FormBuilder} from '@angular/forms';
import {GP} from '../../models/gp';
import {error} from '@angular/compiler/src/util';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointmentForm;
  GpuserId: number;
  bigCode: number;

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
  }

  createAppointment(appointmentData) {
    this.errorMessage = 'Er is iets fout gegaan';
    this.successMessage = '';

    //Endtime calculation by adding 15 minutes to the starttime.
    var startTime = new Date(Date.parse(appointmentData.start));
    console.log(startTime);
    var endTime = new Date(startTime.getTime() + 15 * 60000);

    //Gets user id
    let userId = parseInt(sessionStorage.getItem('user_id'));


    // this.appointmentService.getGPUSerId(userId).subscribe(data => {
    //   this.GpuserId = data;
    //   console.log(this.GpuserId);
    // });
    //
    // this.appointmentService.getBigCode(this.GpuserId).subscribe(data => {
    //   console.log(this.GpuserId);
    //   this.bigCode = data;
    // });

    let appointment = new Appointment(appointmentData.start, endTime, appointmentData.is_digital,
      appointmentData.description, 'Zonnevelt Huisartsenpost', false, 12, userId);
    console.log(appointment);
    this.appointmentService.createAppointment(appointment)
      .subscribe((createdAppointment: Appointment) => {
          const appointmentDate = new Date(appointment.start_time).toLocaleString();
          this.successMessage = `Succesvol geboekt`;
        })
  }

  getGpUser_id(): number {
    let userId = parseInt(sessionStorage.getItem('user_id'));
    let gp_user_id : number = 0

    this.appointmentService.getGPUSerId(userId).subscribe(data => {
     gp_user_id = data
      console.log(data);
    });
    return gp_user_id
  }

}
