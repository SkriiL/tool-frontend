import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MathsService {
  getDeriv(type: string, params: number[]) {
    let args = type + '|';
    for (let i = 0; i < params.length; i++) {
      args = args + params[i] + '|';
    }
    this.socketService.sendRequest('getDeriv', args);
    return new Observable<string>(observer => {
      this.socketService.onEvent('mathExpression').subscribe(expr => {
        return observer.next(expr);
      });
    });
  }

  constructor(private socketService: SocketService) { }
}
