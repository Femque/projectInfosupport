import {TestBed} from '@angular/core/testing';
import {LoginService} from './login.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {User} from "../../models/user";
import {response} from "express";

/**
 * @author Femke Hofland
 * fe LoginService tests
 */

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
  });

  it('Service Test_1: Should perform a post to /login with email and password', () => {

    // Arrange
    const httpClient: jasmine.SpyObj<HttpClient> = jasmine
      .createSpyObj('http', ['post']);
    const loginService = new LoginService(httpClient);
    httpClient.post.and.returnValue(of());

    // Act
    loginService.loginUserFromRemote({
      user_id: 2, email: 'femkehofland@hotmail.nl',
      password: 'wachtwoord2', firstname: 'Femke', lastname: 'Hofland', gender: 'Vrouw',
      dateOfBirth: new Date(1995 - 3 - 6), phonenumber: '0648461416'
    });

    // Assert
    expect(httpClient.post).toHaveBeenCalledWith('http://localhost:8080/user/login', {
      user_id: 2, email: 'femkehofland@hotmail.nl',
      password: 'wachtwoord2', firstname: 'Femke', lastname: 'Hofland', gender: 'Vrouw',
      dateOfBirth: new Date(1995 - 3 - 6), phonenumber: '0648461416'
    });
  });

  it('Service Test_2: Should perform a get request and get user_id', () => {

    // Arrange
    const httpClient: jasmine.SpyObj<HttpClient> = jasmine
      .createSpyObj('http', ['get']);
    const loginService = new LoginService(httpClient);
    httpClient.get.and.returnValue(of());

    // Act
    loginService.fetchUserId('femkehofland@hotmail.nl').subscribe((res: number) => {

      // Assert
      expect(res).toEqual(2);
    });

    expect(httpClient.get).toHaveBeenCalledWith('http://localhost:8080/user/id?email=femkehofland@hotmail.nl');
  });
});
