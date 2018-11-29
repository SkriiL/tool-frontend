import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message} from '../../models/message.model';
import {MessageService} from '../../services/message.service';
import {UserService} from '../../services/user.service';
import {SocketService} from '../../services/socket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, AfterViewChecked {
  public messages: Message[];
  public messageTxt: string;
  private lastMessage: Message;
  @ViewChild('chatBox') private myScrollContainer: ElementRef;

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
      this.messageTxt = undefined;
      sub.unsubscribe();
    });
  }

  private scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  checkDate(message: Message) {
    if (this.lastMessage) {
      if (message.date.getMonth() !== this.lastMessage.date.getMonth()) {
        this.lastMessage = message;
        return true;
      } else if (message.date.getDate() !== this.lastMessage.date.getDate()) {
        this.lastMessage = message;
        return true;
      } else if (message.date.getFullYear() !== this.lastMessage.date.getFullYear()) {
        this.lastMessage = message;
        return true;
      } else {
        return false;
      }
    } else {
      this.lastMessage = message;
      return true;
    }
  }
}
