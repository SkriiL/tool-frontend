import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';
import {Message} from '../models/message.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  sendMessage(byId: number, text: string, date: Date) {
    const msgString = byId + '|' + text + '|' + date.toString();
    this.socketService.sendRequest('sendMessage', msgString);
  }

  getAll() {
    this.socketService.sendRequest('getAllMessages', '');
    return new Observable<Message[]>(observer => {
      this.socketService.onEvent('allMessages').subscribe(ms => {
        const messages: Message[] = [];
        for (let i = 0; i < ms.length; i++) {
          let id = ms[i].id;
          let byId = ms[i].byId;
          let text = ms[i].text;
          let date = new Date(ms[i].date);
          messages.push({id: id, byId: byId, text: text, date: date});
        }
        return observer.next(messages);
      });
    });
  }

  constructor(private socketService: SocketService) { }
}
