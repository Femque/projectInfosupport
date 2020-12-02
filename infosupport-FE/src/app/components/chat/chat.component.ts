import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatService} from './chat.service';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../../models/patient';
import {Message} from '../../models/message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('message') inputMessage;

  selectedPatientId: number =null

  patients: Array<Patient> = [];
  public messages: string[] = [];
  private ws: WebSocket;

  message: string = "";

  constructor(private service: ChatService) {
  }

  public ngOnInit() {
    console.log(sessionStorage);
    console.log("ws://localhost:8080/infosupport-messaging/" + sessionStorage.getItem('user_id'));
    this.ws = new WebSocket("ws://localhost:8080/infosupport-messaging/" + sessionStorage.getItem('user_id'));
    this.ws.addEventListener("open", (e) => {
      this.messages.push("We are open!");
    });
    this.ws.addEventListener("message", (e: MessageEvent) => {
      this.messages.push(e.data)
    })
    console.log(sessionStorage.getItem('user_id'));

    this.getPatients(sessionStorage.getItem("user_id"))
  }

  public sendMessage(value: string) {
    this.ws.send(value);
    this.inputMessage.nativeElement.value = '';
    this.insertMessage(value)
  }

  insertMessage(value: string){
    let message = new Message(value,  "", new Date(), "", parseInt(sessionStorage.getItem("user_id")), this.selectedPatientId,
      parseInt(sessionStorage.getItem("user_id")));

    this.service.insertMessage(message).subscribe(data => {
    })

  }

  getPatients(gp_user_id) {
    this.service.getPatientsForGp(gp_user_id).subscribe(data => {
      console.log(data);

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

  selected(e) {
    this.selectedPatientId = e;
    console.log(e);
  }
}

