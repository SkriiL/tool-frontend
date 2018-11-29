import { Component, OnInit } from '@angular/core';
import {Message} from '../../models/message.model';
import {MessageService} from '../../services/message.service';
import {UserService} from '../../services/user.service';
import {SocketService} from '../../services/socket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  public messages: Message[];
  public messageTxt: string;

  constructor(private messageService: MessageService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.messageService.getAll().subscribe(ms => this.messages = ms);
    if (!sessionStorage.getItem('id')) {
      this.router.navigate(['']);
    }
  }

  send() {
    const id = parseInt(sessionStorage.getItem('id'), 10);
    const sub = this.userService.getSingleById(id).subscribe(u => {
      this.messageService.sendMessage(u.id, this.messageTxt, new Date());
      sub.unsubscribe();
    });
  }
}
