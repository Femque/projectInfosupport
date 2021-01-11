import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalInformationComponent} from './personal-information.component';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "../login/login.service";
import {User} from "../../models/user";
import {HttpTestingController} from "@angular/common/http/testing";
import {of} from "rxjs";

describe('PersonalInformationComponent', () => {
  let componentHtml: HTMLElement;
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;
  let service: LoginService;
  let updateEmail: string;
  let updatePassword: string;


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
    // service = TestBed.inject(LoginService);
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
    // const disablebutton: HTMLButtonElement = componentHtml.querySelector('.btn-outline-dark.disabled');


    // Act:
    // phoneNumber.
    // email.value;
    // password.value;
    // saveButton.dispatchEvent(new Event('submit'));
    // email.dispatchEvent(new Event('submit'));
    // password.dispatchEvent(new Event('submit'));
    //
    // fixture.detectChanges(); // Angular should be updated
    // saveButton.click();

    fixture.detectChanges();

    // expect(submitEl.nativeElement.querySelector('button').disabled).toBeTruthy();

    expect(component.phonenumber).toBeFalsy();
    expect(component.email).toBeFalsy();
    expect(component.password).toBeFalsy();
    // expect(disablebutton).toBeTrue();
  });

  it('email field validity', () => {
    // Arrange (getting UI components)
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    //act
    email.setValue("");
    expect(email.hasError('required')).toBeTruthy();

    email.setValue("A");
    expect(email.hasError('pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\\\.[a-z]{2,4}$")')).toBeFalse();
  });

  it('password check', () => {
    // const firstPassword: HTMLInputElement = componentHtml.querySelector('#defaultPassword');
    const secondPassword: HTMLInputElement = componentHtml.querySelector('#password');
    const thirdPassword: HTMLInputElement = componentHtml.querySelector('#confirm_password');

    let firstPassword = component.form.controls['firstPassword'];
    // let secondPassword = component.form.controls['password'];

    firstPassword.setValue('');
    // @ts-ignore
    firstPassword.markAsTouched(true);
    expect(secondPassword.disabled).toBeTrue();

    // thirdPassword.setValue("kekeke");
    expect(thirdPassword.disabled).toBeTrue();

  });


  it('submitting a form emits a user', () => {
    expect(component.form.valid).toBeFalse();
    let phoneNumberValue = component.form.controls['phoneNumber'].setValue("065434564");
    let emailValue = component.form.controls['email'].setValue("test@test.com");
    // let firstPasswordValue = component.form.controls['firstPassword'].setValue("123456789");
    let secondPasswordValue = component.form.controls['password'].setValue("1234");
    // let thirdPasswordValue = component.form.controls['confirmPassword'].setValue("1234");

    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();

    fixture.detectChanges();

    let service = fixture.debugElement.injector.get(LoginService);

    const userResponse = {
      id: '4',
      email: emailValue,
      password: secondPasswordValue,
    };
    let response;
    // @ts-ignore
    spyOn(service, 'getUserInfoById').and.returnValue(of(userResponse));

    service.getUserInfoById(4).subscribe(res => {
      response = res;
    });

    expect(response).toEqual(userResponse);
    expect(response).toEqual(userResponse);

    let user = new User();
    user.user_id = 4;
    user.email = 'test@testupdate.com'
    user.password = '12345';

    let responseUpdate;
    // @ts-ignore
    spyOn(service, 'updateUser').and.returnValue(of(user));

    service.updateUser(user).subscribe(res => {
      responseUpdate = res;
    });

    expect(responseUpdate.email).toEqual('test@testupdate.com');
    expect(responseUpdate.password).toEqual('12345');

  });


  // it('should render title in a h1 tag', () => { //6
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-component-testing!');
  // });


  // it('should use the user name from the service', () => {
  //   let service = fixture.debugElement.injector.get(LoginService);
  //   let testUser: User[];
  //
  //   let checkUser = service.getUserInfoById(4).subscribe(user => {
  //       testUser = user;
  //     }
  //   );
  //   fixture.detectChanges();
  //   // @ts-ignore
  //   expect(testUser[0].email).toContain('Thijs');
  //
  // });

});
