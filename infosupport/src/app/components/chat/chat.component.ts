import {Component, OnInit} from '@angular/core';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {io} from 'socket.io-client';
import {Observable} from 'rxjs';

const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  socket;
  message: string;
  RoomName: number;

  constructor() {
  }

  ngOnInit(): void {
    console.log(sessionStorage);
    this.getMessages(this.RoomName)
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list').appendChild(element);
      }
    });
  }

  SendMessage() {
    this.socket.emit('RoomName', this.RoomName)
    console.log(this.RoomName);
    this.socket.emit('message', this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list').appendChild(element);
    this.message = '';
  }

  room1(){
    this.RoomName = 1
    console.log(this.RoomName);
    this.setupSocketConnection()
  }

  room2(){
    this.RoomName = 2
    console.log(this.RoomName);
    this.setupSocketConnection()
  }

  getMessages(conversation_id) {

    let observable = new Observable(observer => {

      this.socket.on('message:send:response', (chat) => {
        if (chat.conversation_id === conversation_id) {
          observer.next(chat.msg);
        }
      })

    });

    return observable;

  }
}

