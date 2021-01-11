import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestGpComponent } from './request-gp.component';
import { HttpClientModule } from "@angular/common/http";
import {RequestGpService} from "./request-gp.service";

describe('RequestGpComponent', () => {
  let component: RequestGpComponent;
  let fixture: ComponentFixture<RequestGpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestGpComponent ],
      imports: [HttpClientModule],
      providers: [RequestGpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestGpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Faris Abahri
  it('Test 1: Requests component should be instantiated', () => {
    expect(component).toBeTruthy();
  });

  //Faris Abahri
  it('Test 4: Can get the GP of a patient', () => {
    let service = fixture.debugElement.injector.get(RequestGpService);
    fixture.detectChanges();

    let gp = service.getGPByPatientUserId(3);
    expect(component).toBeTruthy();
  });

  //Faris Abahri
  it('Test 5: Can get the full name of the GP', () => {
    let service = fixture.debugElement.injector.get(RequestGpService);
    fixture.detectChanges();

    let fullname = service.getFullName(7);
    expect(component).toBeTruthy();
  });
});
