import {TestBed, async, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppointmentService} from "./appointment.service";

/**
 * Author Thijs van der Pouw Kraan
 */
describe('appointmentService', () => {
  let appointmentService: AppointmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AppointmentService
      ],
    });

    appointmentService = TestBed.inject(AppointmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it(`should fetch appointments as an Observable`, () => {

    //arrange
    const appointments = [
      {
        "appointment_code": 344455689,
        "start_time": "2021-01-11 20:45:00",
        "end_time": "2021-01-11 21:45:00",
        "is_digital": 0,
        "desscription" : "aaa",
        "location" : "sss",
        "is_folow_up" : 0,
        "big_code" : 6,
        "patient_user_id" : 1,
        "title" : "Bram Osborne"
      }
    ];

    //act: expect specific length
    appointmentService.getAppointments()
      .subscribe((appointments: any) => {
        expect(appointments.length).toBe(1);
      });

    //assert
    let req = httpMock.expectOne('http://localhost:8080/appointments');
    expect(req.request.method).toBe("GET");

    req.flush(appointments);
  });
});
