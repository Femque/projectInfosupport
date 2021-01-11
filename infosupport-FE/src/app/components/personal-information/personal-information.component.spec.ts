import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalInformationComponent} from './personal-information.component';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "../login/login.service";
import {User} from "../../models/user";
import {HttpTestingController} from "@angular/common/http/testing";
import {async, of} from "rxjs";
import {By} from "protractor";

/**
 * @author Thijs van der Pouw Kraan
 */
describe('PersonalInformationComponent', () => {
  let componentHtml: HTMLElement;
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalInformationComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {

    // Arrange (getting UI components)
    const phoneNumber: HTMLInputElement = componentHtml.querySelector('#phoneNumber');
    const email: HTMLInputElement = componentHtml.querySelector('#email');
    const password: HTMLInputElement = componentHtml.querySelector('#password');

    fixture.detectChanges();

    //act: is already filled in without filling in

    //assert
    expect(component.phonenumber).toBeFalsy();
    expect(component.email).toBeFalsy();
    expect(component.password).toBeFalsy();
  });

  it('email field validity', () => {
    // Arrange (getting UI components)
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    //act
    email.setValue("");
    //assert
    expect(email.hasError('required')).toBeTruthy();

    email.setValue("A");
    //assert
    expect(email.hasError('pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\\\.[a-z]{2,4}$")')).toBeFalse();
  });

  it('password check', () => {
    //arrange
    let password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();

    //act
    password.setValue("");
    //assert
    expect(password.hasError('required')).toBeTruthy();

    password.setValue("nieuw");
    expect(password.valid).toBeTruthy();
  });


  it('submitting a form emits a user', () => {
    //arrange
    let emailValue = component.form.controls['email'].setValue("test@test.com");
    let secondPasswordValue = component.form.controls['password'].setValue("1234");

    fixture.detectChanges();

    fixture.detectChanges();

    let service = fixture.debugElement.injector.get(LoginService);

    const userResponse = {
      id: '4',
      email: emailValue,
      password: secondPasswordValue,
    };
    //act
    let response;
    // @ts-ignore
    spyOn(service, 'getUserInfoById').and.returnValue(of(userResponse));

    service.getUserInfoById(4).subscribe(res => {
      response = res;
    });

    //assert
    expect(response).toEqual(userResponse);
    expect(response).toEqual(userResponse);

    //arrange
    let user = new User();
    user.user_id = 4;
    user.email = 'test@testupdate.com'
    user.password = '12345';

    //act
    let responseUpdate;
    // @ts-ignore
    spyOn(service, 'updateUser').and.returnValue(of(user));

    service.updateUser(user).subscribe(res => {
      responseUpdate = res;
    });

    //assert
    expect(responseUpdate.email).toEqual('test@testupdate.com');
    expect(responseUpdate.password).toEqual('12345');
  });
});
