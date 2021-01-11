import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatComponent} from './chat.component';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Patient} from '../../models/patient';
import {GP} from '../../models/gp';
import {ChatService} from './chat.service';
import {Message} from '../../models/message';
import {CometChat} from '@cometchat-pro/chat/CometChat';
import Me = CometChat.Me;

fdescribe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let componentHtml: HTMLElement;
  let patient: Patient;
  let gp: GP;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [HttpClientTestingModule, FormsModule],
    })
      .compileComponents();

    sessionStorage.setItem('user_id', '6');

  });

  beforeEach(() => {
    patient = new Patient(1, new Date(), 'man', '', 'bramosborne@hotmail.nl', 'bram',
      'osborne', '', 'test');
    gp = new GP(6, '', 6, 'george@hotmail.nl', 'george', 'clooney',
      'test', 0, new Date());
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    component.CurrentChats.push(patient);
    component.selected(patient.user_id, patient);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  //Bram Osborne
  it('Test 1: Chat should be instantiated', () => {
    expect(component).toBeTruthy();
  });


  //Bram Osborne
  it('Test 2: search input should update component property', () => {
    //arrange
    const msg_input: HTMLInputElement = componentHtml.querySelector('.write_msg');

    //act
    msg_input.value = 'dit is een bericht voor de test';
    component.insertMessage(msg_input.value);
    fixture.detectChanges();

    //assert
    expect(component.message).toEqual(msg_input.value);
  });

  it('Test 3: should add patients to local array and select it', () => {
    //arrange
    let patient1 = new Patient(2, new Date(), 'man', '', 'bramosborne@hotmail.nl', 'thijs',
      'kraan', '', 'test');
    let patients = component.patients

    //act
    component.patients.push(patient1)

    //assert
    expect(patients.length).toEqual(1)
  });


  //Bram Osborne
  it('test 4: should send a message and save it in the database', () => {
    //arrange
    let service = fixture.debugElement.injector.get(ChatService);
    let message: Message = new Message('dit is een test', '', new Date(), '', 6, 1, 6);
    fixture.detectChanges();

    //act
    service.getMessagesForChat(6, 1).subscribe((data) => {
      //assert
      expect(data.length).toEqual(0);
    });

    //act
    service.insertMessage(message).subscribe()
    service.getMessagesForChat(6, 1).subscribe((data) =>{
      //assert
      expect(data.length).toEqual(1)
    });

  });

  //Bram Osborne
  it('Test 5: request type should be correct', () => {
    const req = httpMock.expectOne(
      "http://localhost:8080/chat/messagesForChat/undefined/6");
    expect(req.request.method).toBe('GET');
  });


});



