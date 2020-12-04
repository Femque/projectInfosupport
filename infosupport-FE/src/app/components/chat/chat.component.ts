import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatService} from './chat.service';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../../models/patient';
import {Message} from '../../models/message';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('message') inputMessage;

  selectedPatientId: any = -1;

  dateString: string;

  userId: number;

  public RecentPatients: Array<Message[]> = [];
  recentChats: Map<number, Message> = new Map<number, Message>();
  CurrentChats: Patient[] = [];
  patients: Array<Patient> = [];
  tempMessages: Message[] = [];
  recentMessages: Map<Patient, Message>;
  test: number;
  public messagesForCurrentPatient: Message[] = [];
  private ws: WebSocket;

  message: string = '';

  previewMessage;
  previewMessageTime;

  constructor(private service: ChatService) {
  }

  public ngOnInit() {
    this.getUsedChats(parseInt(sessionStorage.getItem("user_id")))
    this.userId = parseInt(sessionStorage.getItem('user_id'));
    this.ws = new WebSocket('ws://localhost:8080/infosupport-messaging/' + sessionStorage.getItem('user_id'));
    this.ws.addEventListener('open', (e) => {

    });
    this.ws.addEventListener('message', (e: MessageEvent) => {
      this.messagesForCurrentPatient.push(new Message(e.data, '', new Date(), '', parseInt(sessionStorage.getItem('user_id')), this.selectedPatientId,
        parseInt(sessionStorage.getItem('user_id'))));
    });

    this.getPatients(sessionStorage.getItem('user_id'));

    setTimeout(() => {
      this.messagesForCurrentPatient = []
    }, 500)


  }

  public sendMessage(value: string) {
    this.ws.send(value);
    this.inputMessage.nativeElement.value = '';
    this.insertMessage(value);
  }

  insertMessage(value: string) {
    let message = new Message(value, '', new Date(), '', parseInt(sessionStorage.getItem('user_id')), this.selectedPatientId,
      parseInt(sessionStorage.getItem('user_id')));

    this.service.insertMessage(message).subscribe(data => {
    });

  }

  getPatients(gp_user_id) {
    this.service.getPatientsForGp(gp_user_id).subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        this.patients.push(new Patient(
          data[i].user_id,
          data[i].dateOfBirth,
          data[i].gender,
          data[i].allergies,
          data[i].email,
          data[i].firstname,
          data[i].lastname,
          data[i].phonenumber,
          data[i].password
        ));
      }
    });

    return this.patients;
  }

  getMessagesForChat(gp_user_id: number, patient_user_id: number) {
    this.messagesForCurrentPatient = [];
    this.service.getMessagesForChat(gp_user_id, patient_user_id).subscribe(data => {
        this.messagesForCurrentPatient = data;


        this.RecentPatients.push(this.messagesForCurrentPatient);

        if (this.recentChats.get(patient_user_id) != data[data.length - 1]) {
          this.recentChats.set(patient_user_id, data[data.length - 1]);
        }
        this.getPatientFromDropdown(patient_user_id);
      }
    );
  }

  getPatientFromDropdown(user_id: number) {
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].user_id == user_id) {
        if (!this.CurrentChats.includes(this.patients[i])) {
          this.test = user_id;
          this.CurrentChats.push(this.patients[i]);
        }
      }
    }
  }

  selected(e) {
    this.messagesForCurrentPatient = [];
    // this.CurrentChats = [];
    this.selectedPatientId = e;

    this.getMessagesForChat(parseInt(sessionStorage.getItem('user_id')), e);
  }

  getMostRecentChat(id: number): Message {
      return this.recentChats.get(id);
  }

  formatDate(date: Date) {

    return date.toString().split('T', 2);
  }

  getUsedChats(gp_user_id: number){
    this.service.getPatientsForGp(gp_user_id).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.service.getMessagesForChat(gp_user_id, data[i].user_id).subscribe(dataMessages =>{
          if (dataMessages.length > 0 ){
            this.getMessagesForChat(gp_user_id, data[i].user_id)

           

          }
        })

      }
    })
    }


}

