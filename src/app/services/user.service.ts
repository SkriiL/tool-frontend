import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getSingleById(id: number) {
    this.socketService.sendRequest('getUserById', id.toString());
    return new Observable<User>(observer => {
      const event = 'user' + id;
      this.socketService.onEvent(event).subscribe(u => {
        return observer.next(u);
      });
    });
  }

  getSingleByUsername(username: string) {
    this.socketService.sendRequest('getUserByUsername', username);
    return new Observable<User>(observer => {
      this.socketService.onEvent('user').subscribe(u => {
        return observer.next(u);
      });
    });
  }

  create(username: string, email: string, password: string) {
    const arg = username + '|' + email + '|' + password;
    this.socketService.sendRequest('createUser', arg);
  }

  getAll() {
    this.socketService.sendRequest('getAllUsers', '');
    return new Observable<User[]>(observer => {
      this.socketService.onEvent('users').subscribe(us => {
        return observer.next(us);
      });
    });
  }

  edit(user: User) {
    const userStr = user.id + '|' + user.username + '|' + user.email + '|' + user.password;
    this.socketService.sendRequest('editUser', userStr);
  }

  constructor(private socketService: SocketService) { }
}
