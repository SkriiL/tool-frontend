import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';
import {Observable} from 'rxjs';
import {Book} from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  getAllForUser(id: number): Observable<Book[]> {
    this.socketService.sendRequest('getBooksForUser', id.toString());
    return new Observable<Book[]>(observer => {
      this.socketService.onEvent('books').subscribe(bs => {
        for (let i = 0; i < bs.length; i++) {
          bs[i].own = bs[i].own === 'true';
          bs[i].read = bs[i].read === 'true';
        }
        return observer.next(bs);
      });
    });
  }

  edit(book: Book) {
    const book_str = book.id + '|' + book.title + '|' + book.author + '|' + book.price + '|' + book.own + '|'
      + book.read + '|' + book.link + '|' + book.userId;
    this.socketService.sendRequest('editBook', book_str);
  }

  deleteById(id: number) {
    this.socketService.sendRequest('deleteBook', id.toString());
  }

  add(title: string, author: string, price: string, own: boolean, read: boolean, link: string, userId: number) {
    const ownStr = own ? 'true' : 'false';
    const readStr = read ? 'true' : 'false';
    const bookStr = title + '|' + author + '|' + price + '|' + ownStr + '|' + readStr + '|' + link + '|' + userId;
    this.socketService.sendRequest('addBook', bookStr);
  }

  constructor(private socketService: SocketService) { }
}
