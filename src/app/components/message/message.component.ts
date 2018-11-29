import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../models/message.model';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-message',
  template: `
    <app-chat-date *ngIf="showDate" [date]="_message.date"></app-chat-date>
    <div class="card ml-2 mt-2 mr-2">
      <app-view-user-modal [user]="user" [class]="titleStyle">{{ user?.username }}</app-view-user-modal>
      <span [class]="textStyle">{{ _message.text }}</span>
      <span [class]="dateStyle">{{ _message.date | dateFormat:'time'}}</span>
    </div>
  `
})
export class MessageComponent implements OnInit {
  public _message: Message;
  public user: User;
  public titleStyle = 'card-title ml-2';
  public textStyle = 'card-text ml-2';
  public dateStyle = 'card-text font-italic ml-2';
  private currentUser: User;

  @Input('message')
  set message(value: Message) {
    this._message = value;
    this.userService.getSingleById(value.byId).subscribe(u => this.user = u);
    const sub = this.userService.getSingleById(parseInt(sessionStorage.getItem('id'), 10)).subscribe(u => {
      this.currentUser = u;
      if (value.byId === u.id) {
        this.titleStyle = 'card-title text-right mr-2';
        this.textStyle = 'card-text text-right mr-2';
        this.dateStyle = 'card-text font-italic text-right mr-2';
      }
      sub.unsubscribe();
    });
  }
  @Input() showDate = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
