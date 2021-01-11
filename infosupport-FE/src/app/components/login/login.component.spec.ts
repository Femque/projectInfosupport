import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from './login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from '@angular/common/http/testing';

/**
 * @author Femke Hofland
 * fe Login Component tests
 */

describe('LoginComponent', () => {
  let component: LoginComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function updateForm(email, password) {
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
  }

  it('Test_1: Should find login form and submit button', () => {

    // Arrange
    const emailContainer: HTMLInputElement = componentHtml.querySelector('#email');
    const passwordContainer: HTMLInputElement = componentHtml.querySelector('#password');
    const submitBtn: HTMLButtonElement = componentHtml.querySelector('#loginButton');

    // Act
    updateForm('femkehofland@hotmail.nl', 'wachtwoord2');
    fixture.detectChanges();

    // Assert
    expect(emailContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(submitBtn).toBeDefined();
  });

  it('Test_2: Should expect user to have user_id and user_role after login', () => {
    // Arrange
    const submitBtn: HTMLButtonElement = componentHtml.querySelector('#loginButton');

    // Act
    updateForm('femkehofland@hotmail.nl', 'wachtwoord2');
    fixture.detectChanges();
    submitBtn.click();
    fixture.detectChanges();

    // Assert
    expect(component.getUser_id).toBeDefined();
    expect(component.getUserRole).toBeDefined();
  });

  it('Test_3: Should expect error when email and password are wrong', () => {
    // Arrange
    const submitBtn: HTMLButtonElement = componentHtml.querySelector('#loginButton');
    const errorMsg = fixture.debugElement.nativeElement.querySelector('.alert-error');

    // Act
    updateForm('wrong@wrong.nl', 'wrong');
    fixture.detectChanges();
    submitBtn.click();
    fixture.detectChanges();

    // Assert
    expect(errorMsg).toBeDefined();
  });
});

