import {TestBed} from '@angular/core/testing';
import {LoginService} from './login.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../../models/user";

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  beforeEach(() => {
    httpMock.verify();
    sessionStorage.setItem('user_id', String(2))
  });

  // Service Test_01: get user_data
  it('Service Test_01: should get user_data', () => {

    const userData = [{
      user_id: 2,
      firstname: 'Femke',
      lastname: 'Hofland',
      email: 'femkehofland@hotmail.nl',
      phonenumber: '0648461416',
      password: 'wachtwoord2',
      dateOfBirth: new Date(1995-3-6),
      gender: "Vrouw"
    }];

    // service.getUserInfoById().subscribe( (res: User[]) => {
    //   expect(res.).toEqual('Femke')
    // })
  })

});
