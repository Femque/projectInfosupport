import {TestBed, async, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppointmentService} from "./appointment.service";

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
      // {
      //   "userId": 1,
      //   "id": 2,
      //   "title": "qui est esse",
      //   "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      // },
      // {
      //   "userId": 1,
      //   "id": 3,
      //   "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      //   "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
      // }
    ];


    //expect specific length
    appointmentService.getAppointments()
      .subscribe((appointments: any) => {
        expect(appointments.length).toBe(1);
      });

    let req = httpMock.expectOne('http://localhost:8080/appointments');
    expect(req.request.method).toBe("GET");

    req.flush(appointments);
  });
});
