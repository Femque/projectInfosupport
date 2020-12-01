import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatService} from './chat.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('message') inputMessage;

  public messages: string[] = [];
  private ws: WebSocket;

  message: string = "";

  constructor(service: ChatService) {
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
  }

  public sendMessage(value: string) {
    this.ws.send(value);
    this.inputMessage.nativeElement.value = '';
  }
}

