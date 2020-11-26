import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public messages: string[] = [];
  private ws: WebSocket;

  public ngOnInit() {
    this.ws = new WebSocket("ws://localhost:8080/infosupport-messaging");
    this.ws.addEventListener("open", (e) => {
      this.messages.push("We are open!");
    });
    this.ws.addEventListener("message", (e: MessageEvent) => {
      this.messages.push(e.data)
    })
  }

  public sendMessage(value: string) {
    this.ws.send(value);
  }




  // socket;
  // message: string;
  // RoomName: number;

  // constructor() {
  // }

  // ngOnInit(): void {
  //   console.log(sessionStorage);
  //   this.getMessages(this.RoomName)
  //   this.setupSocketConnection()
  // }

  // setupSocketConnection() {
  //   this.socket = io(SOCKET_ENDPOINT);
  //   this.socket.on('message-broadcast', (data: string) => {
  //     if (data) {
  //       const element = document.createElement('outgoing_msg');
  //       element.innerHTML = data;
  //       element.style.background = '#05728f none repeat scroll 0 0';
  //       element.style.borderRadius = '3px'
  //       element.style.color = '#fff';
  //       element.style.padding =  '5px 10px 5px 12px';
  //       element.style.margin = '0';
  //       element.style.width = '46%';
  //       element.style.float = 'right';
  //       document.getElementById('msg_history').appendChild(element);
  //     }
  //   });
  // }

  // SendMessage() {
  //   this.socket.emit('message', this.message);
  //   const element = document.createElement('outgoing_msg');
  //   element.innerHTML = this.message;
  //   element.style.background = '#05728f none repeat scroll 0 0';
  //   element.style.borderRadius = '3px'
  //   element.style.color = '#fff';
  //   element.style.padding =  '5px 10px 5px 12px';
  //   element.style.margin = '0';
  //   element.style.width = '46%';
  //   element.style.float = 'right';
  //   document.getElementById('msg_history').appendChild(element);
  //   this.message = '';
  // }

  // getMessages(conversation_id) {
  //   let observable = new Observable(observer => {

  //     this.socket.on('message:send:response', (chat) => {
  //       if (chat.conversation_id === conversation_id) {
  //         observer.next(chat.msg);
  //       }
  //     })

  //   });

  //   return observable;

  // }
}

