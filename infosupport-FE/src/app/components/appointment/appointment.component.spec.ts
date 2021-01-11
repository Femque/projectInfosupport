import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppointmentComponent} from './appointment.component';
import {HttpClientModule} from '@angular/common/http';
import {AppointmentService} from './appointment.service';
import {Appointment} from '../../models/appointment';
import {FormBuilder} from '@angular/forms';
import {LoginService} from '../login/login.service';
import {User} from '../../models/user';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<AppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentComponent],
      imports: [HttpClientModule],
      providers: [FormBuilder, AppointmentService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    let service_l = fixture.debugElement.injector.get(LoginService);
    fixture.detectChanges();

    let user = new User();

    user.email = 'george@hotmail.nl';
    user.password = 'wachtwoord6';

    service_l.loginUserFromRemote(user);
    service_l.getUserRole(user.email);
    sessionStorage.setItem('user_id', String(6));
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  //Jesse Bijma
  it('Test 3: can create appointment, and get it by user_id', () => {
    let service_a = fixture.debugElement.injector.get(AppointmentService);
    fixture.detectChanges();

    let appointment_a = new Appointment();

    appointment_a.patient_user_id = 1;
    service_a.createAppointment(appointment_a);
    let appointment_b = service_a.getGPUSerId(1);
    expect(appointment_b).toBeTruthy();
  });
});
