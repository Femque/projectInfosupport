import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient){
  }

}
