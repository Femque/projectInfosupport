import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsComponent } from './requests.component';
import { HttpClientModule } from "@angular/common/http";
import {RequestGP} from "../../models/requestgp";
import {RequestGpService} from "../request-gp/request-gp.service";
import {LoginService} from "../login/login.service";
import {User} from "../../models/user";


describe('RequestsComponent', () => {
  let component: RequestsComponent;
  let fixture: ComponentFixture<RequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsComponent ],
      imports: [HttpClientModule],
      providers: [RequestGpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsComponent);
    component = fixture.componentInstance;
    let service_l = fixture.debugElement.injector.get(LoginService);
    fixture.detectChanges();

    // let user = new User();
    //
    // user.email = 'tim@hotmail.nl';
    // user.password = 'wachtwoord7';
    //
    // service_l.loginUserFromRemote(user);
    // service_l.getUserRole(user.email);
    // sessionStorage.setItem('user_id', String(7));
    // fixture.detectChanges();
  });

  //Faris Abahri
  it('Test 2: Can add request to list', () => {
    const request = new RequestGP(3, 7, "Faris Abahri");

    //Getting the old length for comparison
    let oldLength = component.requestList.length;

    component.requestList.push(request)
    expect(component.requestList.length > oldLength).toBeTruthy();
  });

  //Faris Abahri
  it('Test 3: Can get requests for GP from the service', () => {
    //Ini
    let service = fixture.debugElement.injector.get(RequestGpService);
    fixture.detectChanges();

    service.getRequestsForGP();

    let requests =  service.getRequestsForGP();
    expect(requests).toBeTruthy();
  });
});
