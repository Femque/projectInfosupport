import {ComponentFixture, async, TestBed} from '@angular/core/testing';

import {CalenderComponent} from './calender.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder, FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Appointment} from '../../models/appointment';
import {CalendarService} from './calendar.service';
import {AppointmentService} from '../appointment/appointment.service';
import {User} from '../../models/user';
import {Observable} from 'rxjs';

fdescribe('CalenderComponent', () => {
  let component: CalenderComponent;
  let fixture: ComponentFixture<CalenderComponent>;
  let componentHtml: HTMLElement;
  let service: CalendarService;
  let mockUser: User;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalenderComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    mockUser = new User();
    fixture.detectChanges();

    mockUser.user_id = 6;
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Test 1: Calendar should be instantiated', () => {
    const calendar: HTMLElement = componentHtml.querySelector('#calendar');
    expect(calendar).toBeTruthy();
  });

  it('Test 2: Can add appointment to local list', () => {
    const appointment = new Appointment();
    component.appointments.push(appointment);
    expect(component.appointments.length > 0).toBeTruthy();
  });

  it('Test 4: Test if update opens and closes', () => {
    component.openUpdate('click');
    component.cancelUpdate();
    expect().nothing();
  });

  it('Test 5: can create appointment, and update it', () => {
    let service_a = fixture.debugElement.injector.get(AppointmentService);
    let service_b = fixture.debugElement.injector.get(CalendarService);
    fixture.detectChanges();

    let appointment_a = new Appointment();

    appointment_a.patient_user_id = 1;
    service_a.createAppointment(appointment_a);

    appointment_a.patient_user_id = 2;
    service_b.updateAppointment(appointment_a);

    let appointment_b = service_a.getGPUSerId(1);
    expect(appointment_b).toBeTruthy();
  });
});
