import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from './chat.service';
import {Patient} from '../../models/patient';
import {Message} from '../../models/message';
import {GP} from '../../models/gp';
import {map} from 'rxjs/operators';
import set = Reflect.set;
import {findLast} from '@angular/compiler/src/directive_resolver';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('message') inputMessage;
  @ViewChild('scrollMe') private messageContainer: ElementRef;

  selectedPatientId: any = 0;
  selectedpatient: Patient;
  userId: number;
  generalPractionerId;
  generalPractitioner;

  userRole: string;
  role: boolean;

  public RecentPatients: Array<Message[]> = [];
  recentChats: Map<number, Message> = new Map<number, Message>();
  CurrentChats: Patient[] = [];
  patients: Array<Patient> = [];
  public messagesForCurrentPatient: Message[] = [];

  private ws: WebSocket;

  lastMessage: string;
  lastDate: Date;
  message: string = '';

  constructor(private service: ChatService) {
  }

  ngOnInit() {
    //getting role of user
    this.checkLoggedIn();
    this.userRole = sessionStorage.getItem('user_role');
    this.getrole();
    if (this.role == false) {
      this.getPatients(sessionStorage.getItem('user_id'));
    } else {
      // this.selectedPatientId = sessionStorage.getItem('user_id')
      this.getGp();
    }
    //get chats that contain messages
    this.getUsedChats(parseInt(sessionStorage.getItem('user_id')));
    //get user_id
    this.userId = parseInt(sessionStorage.getItem('user_id'));

    //create websocket connection
    this.ws = new WebSocket('ws://localhost:8080/infosupport-messaging/' + sessionStorage.getItem('user_id'));
    this.ws.addEventListener('open', (e) => {
      console.log('open');
    });

    //when message is being send
    this.ws.addEventListener('message', (e: MessageEvent) => {
      console.log('message');
      //get messages for chat when a new message is detected
      setTimeout(() => {
        if (this.role == false) {
          setTimeout(() => {
            this.patients.forEach(p => {
              this.getMessagesForChat(this.userId, p.user_id);
            });
            this.getMessagesForChat(this.userId, this.selectedPatientId);
            this.messagesForCurrentPatient.push(new Message(e.data, '', new Date(), '', parseInt(sessionStorage.getItem('user_id')), this.selectedPatientId,
              parseInt(sessionStorage.getItem('user_id'))));
          }, 100);
        } else {
          setTimeout(() => {
            console.log('patient');
            this.getMessagesForChat(this.generalPractionerId, this.userId);
            this.messagesForCurrentPatient.push(new Message(e.data, '', new Date(), '', this.generalPractionerId, this.userId,
              parseInt(sessionStorage.getItem('user_id'))));
          }, 100);
        }

      }, 10);
    });

    this.ws.addEventListener('close', (e) => {
      console.log('closing?');
      this.ws.onopen;
    });
  }
  //when the the send button is clicked, this method is called
  public sendMessage(value: string) {
    //send message to websocket
    this.ws.send(value);
    this.inputMessage.nativeElement.value = '';
    //insert message in database
    this.insertMessage(value);

    //get messages for current chat
    if (this.role == false) {
      setTimeout(() => {
        this.getMessagesForChat(this.userId, this.selectedPatientId);
      }, 100);
    } else {
      setTimeout(() => {
        this.getMessagesForChat(this.generalPractionerId, this.userId);
      }, 100);
    }
  }

  //inserts message in database
  insertMessage(value: string) {
    if (this.role == false) {
      let message = new Message(value, '', new Date(), '', parseInt(sessionStorage.getItem('user_id')), this.selectedPatientId,
        parseInt(sessionStorage.getItem('user_id')));
      if (message.message != '') {
        this.service.insertMessage(message).subscribe(data => {
        });
      }
    } else {
      let message = new Message(value, '', new Date(), '', this.generalPractionerId, this.userId,
        this.userId);

      if (message.message != '') {
        this.service.insertMessage(message).subscribe(data => {
        });
      }

    }


  }

  //get patients for the logged in docter
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
        //get last message from chat to show in list of current chats
        this.getlastMessage(gp_user_id, data[i].user_id);
      }
    });

    return this.patients;
  }

  //get gp for logged in patient
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

  //get messages for the clicked chat
  getMessagesForChat(gp_user_id: number, patient_user_id: number) {
    this.messagesForCurrentPatient = [];
    //get message from database
    this.service.getMessagesForChat(gp_user_id, patient_user_id).subscribe(data => {
        this.messagesForCurrentPatient = data;
        this.RecentPatients.push(this.messagesForCurrentPatient);
        if (!this.role) {
          if (this.recentChats.get(patient_user_id) != data[data.length - 1]) {
            this.recentChats.set(patient_user_id, data[data.length - 1]);
            this.getPatientFromDropdown(patient_user_id);
          }
        } else {
          if (data.length != 0) {
            if (this.lastDate != data[data.length - 1].message_time && this.lastMessage != data[data.length - 1].message) {
              this.lastMessage = data[data.length - 1].message;
              this.lastDate = data[data.length - 1].message_time;
            }
          }
        }
      }
    );
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  //open chat with patient that has been selected from the dropdown
  getPatientFromDropdown(user_id: number) {
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].user_id == user_id) {
        if (!this.CurrentChats.includes(this.patients[i])) {
          this.CurrentChats.push(this.patients[i]);
        }
      }
    }

  }


  //finds the last message between two users
  getlastMessage(gp_user_id: number, patient_user_id: number) {
    this.service.getMessagesForChat(gp_user_id, patient_user_id).subscribe(data => {
      if (!this.role) {
        if (this.recentChats.get(patient_user_id) != data[data.length - 1]) {
          this.recentChats.set(patient_user_id, data[data.length - 1]);
        }
      }
    });
  }

  //get the id from the selected patient
  selected(e, p) {
    this.messagesForCurrentPatient = [];
    this.selectedPatientId = e;
    this.selectedpatient = p;

    if (this.role == false) {
      this.getMessagesForChat(parseInt(sessionStorage.getItem('user_id')), e);
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

    } else {
      this.getMessagesForChat(this.generalPractionerId, parseInt(sessionStorage.getItem('user_id')));
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }


  }
  
  //get recent message with the given id
  getMostRecentChat(id: number): Message {
    return this.recentChats.get(id);
  }

  //format date to remove the T
  formatDate(date: Date) {
    return date.toString().replace('T', ' ');
  }

  //get all the chats that have messages
  getUsedChats(gp_user_id: number) {
    this.service.getPatientsForGp(gp_user_id).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.service.getMessagesForChat(gp_user_id, data[i].user_id).subscribe(dataMessages => {
          if (dataMessages.length > 0) {
            for (let j = 0; j < this.patients.length; j++) {
              if (!this.CurrentChats.includes(this.patients[i])) {
                this.CurrentChats.push(this.patients[i]);
              }
            }
          }
        });
      }
    });
  }

  //get the role from the current user
  getrole() {
    this.role = sessionStorage.getItem('user_role') == 'patient';
  }

  //scroll to the bottom of the chat
  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  /**
   * method checking before acces to page
   */
  checkLoggedIn() {
    var ask = sessionStorage.getItem('user_role');
    if (ask === null) {
      window.alert('U bent nog niet ingelogd');
      window.location.href = '#';
    }
  }

}

