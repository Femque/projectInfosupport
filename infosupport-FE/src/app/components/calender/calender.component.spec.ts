import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalenderComponent} from './calender.component';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Appointment} from '../../models/appointment';
import {CalendarService} from './calendar.service';

fdescribe('CalenderComponent', () => {
  let component: CalenderComponent;
  let fixture: ComponentFixture<CalenderComponent>;
  let componentHtml: HTMLElement;
  let service: CalendarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalenderComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [FormBuilder, CalendarService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test 1: Calendar should be instantiated', () => {
    const calendar: HTMLElement = componentHtml.querySelector('#calendar');
    expect(calendar).toBeTruthy();
  });

  it('Test 2: Can add appointment', () => {
    //Get calendar?
    const calendar: HTMLElement = componentHtml.querySelector('#calendar');

    //create mock appointment
    const appointment = new Appointment();
    //add it to the list of appointments
    component.appointments.push(appointment);
    //check if list.length > 0 = truthy
    expect(component.appointments.length > 0).toBeTruthy();
  });
});
