import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {RightService} from './right.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getSingleById(id: number) {
    this.socketService.sendRequest('getUserById', id.toString());
    return new Observable<User>(observer => {
      const event = 'user' + id;
      this.socketService.onEvent(event).subscribe(u => {
        u.rights = this.rightService.getSingleById(u.rights);
        return observer.next(u);
      });
    });
  }

  getSingleByUsername(username: string) {
    this.socketService.sendRequest('getUserByUsername', username);
    return new Observable<User>(observer => {
      const sub = this.socketService.onEvent('user').subscribe(u => {
        u.rights = this.rightService.getSingleById(u.rights);
        return observer.next(u) + sub.unsubscribe();
      });
    });
  }

  create(username: string, email: string, password: string, imgUrl: string) {
    const arg = username + '|' + email + '|' + password + '|' + imgUrl + '|' + 0;
    this.socketService.sendRequest('createUser', arg);
  }

  getAll() {
    this.socketService.sendRequest('getAllUsers', '');
    return new Observable<User[]>(observer => {
      this.socketService.onEvent('users').subscribe(us => {
        for (let i = 0; i < us.length; i++) {
          us[i].rights = this.rightService.getSingleById(us[i].rights);
        }
        return observer.next(us);
      });
    });
  }

  edit(user: User) {
    const userStr = user.id + '|' + user.username + '|' + user.email + '|' + user.password + '|' + user.imgUrl + '|' + user.rights.id;
    this.socketService.sendRequest('editUser', userStr);
  }

  constructor(private socketService: SocketService,
              private rightService: RightService) { }
}
