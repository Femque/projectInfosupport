import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentComponent } from './appointment.component';
import {HttpClientModule} from '@angular/common/http';
import {AppointmentService} from './appointment.service';
import {Appointment} from '../../models/appointment';

fdescribe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<AppointmentComponent>;
  let service: AppointmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentComponent ],
      imports: [HttpClientModule],
      providers: [AppointmentService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test 1: can create appointment, and get it by user_id', () => {
      let appointment_a = new Appointment();
      appointment_a.patient_user_id = 1
      service.createAppointment(appointment_a);
      let appointment_b = service.getGPUSerId(1);
      expect(appointment_b).toBeTruthy();
  });
});
