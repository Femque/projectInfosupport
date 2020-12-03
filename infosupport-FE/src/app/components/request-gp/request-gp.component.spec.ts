import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestGpComponent } from './request-gp.component';

describe('RequestGpComponent', () => {
  let component: RequestGpComponent;
  let fixture: ComponentFixture<RequestGpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestGpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestGpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
