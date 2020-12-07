import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from './chat.service';
import {Patient} from '../../models/patient';
import {Message} from '../../models/message';
import {GP} from '../../models/gp';
import {map} from 'rxjs/operators';
import set = Reflect.set;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('message') inputMessage;

  @ViewChild('scrollMe') private messageContainer: ElementRef;

  selectedPatientId: any = -1;

  dateString: string;

  userId: number;
  role;

  public RecentPatients: Array<Message[]> = [];
  recentChats: Map<number, Message> = new Map<number, Message>();
  CurrentChats: Patient[] = [];
  patients: Array<Patient> = [];
  tempMessages: Message[] = [];
  recentMessages: Map<Patient, Message>;
  public messagesForCurrentPatient: Message[] = [];
  private ws: WebSocket;
  lastMessage: string;
  lastDate: Date;
  tempPatient: Patient;

  messageDate = new Date()

  message: string = '';
  generalPractionerId;
  generalPractitioner;

  previewMessage;
  previewMessageTime;

  constructor(private service: ChatService) {
  }

  ngOnInit() {
    this.getrole();
    if (this.role == false) {
      this.getPatients(sessionStorage.getItem('user_id'));
    } else {
      this.getGp();
    }
    this.getUsedChats(parseInt(sessionStorage.getItem('user_id')));
    this.userId = parseInt(sessionStorage.getItem('user_id'));

    this.ws = new WebSocket('ws://localhost:8080/infosupport-messaging/' + sessionStorage.getItem('user_id'));
    this.ws.addEventListener('open', (e) => {
      console.log('open');
    });

    this.ws.addEventListener('message', (e: MessageEvent) => {
      this.messagesForCurrentPatient.push(new Message(e.data, '', new Date(), '', parseInt(sessionStorage.getItem('user_id')), this.selectedPatientId,
        parseInt(sessionStorage.getItem('user_id'))));
      if (this.role == false) {
        setTimeout(() => {
          this.getMessagesForChat(this.userId, this.selectedPatientId)
        }, 50)
      }else if (this.role == true){
        setTimeout(() => {
          this.getMessagesForChat(this.generalPractionerId, this.userId)
        }, 50)
      }
      return false;
    });

    this.ws.addEventListener('close', () => {
      console.log("closing?");
      setTimeout(() => {
        this.ws = new WebSocket('ws://localhost:8080/infosupport-messaging/' + sessionStorage.getItem('user_id'));

      }, 1000)
    });


  }


  // sortCurrentChats(){
  //   return this.CurrentChats.sort((a, b) => (this.getLastMessage(a.user_id) < this.getLastMessage(b.user_id) ? -1 : 1))
  // }

  public sendMessage(value: string) {
    this.ws.send(value);
    this.inputMessage.nativeElement.value = '';
    this.insertMessage(value);

    if (this.role == false) {
      setTimeout(() => {
        this.getMessagesForChat(this.userId, this.selectedPatientId)
      }, 100)
    }else{
      setTimeout(() => {
        this.getMessagesForChat(this.generalPractionerId, this.userId)
      }, 100)
    }


  }

  insertMessage(value: string) {
    if (this.role == false) {
      let message = new Message(value, '', new Date(), '', parseInt(sessionStorage.getItem('user_id')), this.selectedPatientId,
        parseInt(sessionStorage.getItem('user_id')));

      this.service.insertMessage(message).subscribe(data => {
      });
    } else {
      let message = new Message(value, '', new Date(), '', this.generalPractionerId, this.userId,
        this.userId);

      this.service.insertMessage(message).subscribe(data => {
      });

    }


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
        this.getlastMessage(gp_user_id, data[i].user_id)
      }
    });

    return this.patients;
  }

  getGp() {
    this.service.getGPByPatientUserId(parseInt(sessionStorage.getItem('user_id'))).subscribe(data => {
      this.generalPractionerId = data;
      this.service.getGp(this.generalPractionerId).subscribe(data => {
        this.generalPractitioner = new GP(
          data.big_code,
          data.specialty,
          data.user_id,
          data.email,
          data.firstname,
          data.lastname,
          data.password,
          data.phonenumber
        );
        this.CurrentChats.push(this.generalPractitioner);
        this.RecentPatients.push(this.messagesForCurrentPatient);
        this.getMessagesForChat(this.generalPractionerId, this.userId);

      });
    });
  }

  getMessagesForChat(gp_user_id: number, patient_user_id: number) {
    this.messagesForCurrentPatient = [];
    this.service.getMessagesForChat(gp_user_id, patient_user_id).subscribe(data => {
        this.messagesForCurrentPatient = data;
        this.RecentPatients.push(this.messagesForCurrentPatient);
        if (!this.role) {
          if (this.recentChats.get(patient_user_id) != data[data.length - 1]) {
            this.recentChats.set(patient_user_id, data[data.length - 1]);

            this.getPatientFromDropdown(patient_user_id);
          }
        } else {
          if (this.lastDate != data[data.length - 1].message_time && this.lastMessage != data[data.length - 1].message) {
            this.lastMessage = data[data.length - 1].message;
          }
          this.lastDate = data[data.length - 1].message_time;
        }
      }
    );
    setTimeout(() => {
      this.scrollToBottom()
    }, 100)
  }

  getPatientFromDropdown(user_id: number) {
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].user_id == user_id) {
        if (!this.CurrentChats.includes(this.patients[i])) {
          this.CurrentChats.push(this.patients[i]);
        }
      }
    }

  }

  getlastMessage(gp_user_id: number, patient_user_id: number){
    this.service.getMessagesForChat(gp_user_id,  patient_user_id).subscribe(data => {
      if (!this.role) {
        if (this.recentChats.get(patient_user_id) != data[data.length - 1]) {
          this.recentChats.set(patient_user_id, data[data.length - 1]);
        }}
  })}

  selected(e) {
    this.messagesForCurrentPatient = [];
    this.selectedPatientId = e;

    if (this.role == false) {
      this.getMessagesForChat(parseInt(sessionStorage.getItem('user_id')), e);
      setTimeout(() => {
        this.scrollToBottom();
      }, 100)

    } else {
      this.getMessagesForChat(this.generalPractionerId, parseInt(sessionStorage.getItem('user_id')));
      setTimeout(() => {
        this.scrollToBottom();
      }, 100)
    }



  }

  getMostRecentChat(id: number): Message {
    return this.recentChats.get(id);
  }

  formatDate(date: Date) {
    return date.toString().replace('T', ' ');
  }

  getUsedChats(gp_user_id: number) {
    this.service.getPatientsForGp(gp_user_id).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.service.getMessagesForChat(gp_user_id, data[i].user_id).subscribe(dataMessages => {
          if (dataMessages.length > 0) {
            for (let j = 0; j < this.patients.length; j++) {
              if (!this.CurrentChats.includes(this.patients[i])){
                this.CurrentChats.push(this.patients[i])
              }
            }
          }
        });
      }
    });
  }

  getrole() {
    this.role = sessionStorage.getItem('user_role') == 'patient';
  }

  scrollToBottom(): void {
    try {
      console.log(this.messageContainer.nativeElement.scrollTop);
      console.log(this.messageContainer.nativeElement.scrollHeight);
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
  //
  // getLastMessage(userId){
  //
  //   let message = this.service.getMessagesForChat(this.userId, userId).pipe(map((data) => data))
  //   console.log(message);
  //   return message.subscribe(data => {
  //     console.log(data[data.length - 1].message_time);
  //   })
  // }

}

