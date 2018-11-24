import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Book} from '../../models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  public selectedBook: Book;
  public books: Observable<Book[]>;
  public new: boolean;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    const id = parseInt(sessionStorage.getItem('id'), 10);
    this.books = this.bookService.getAllForUser(id);
  }

  select(book: Book) {
    this.new = false;
    this.selectedBook = book;
  }

  close() {
    this.selectedBook = undefined;
  }

  add() {
    this.new = true;
    this.selectedBook = new Book();
    this.selectedBook.id = 0;
  }

  delete(book: Book) {
    this.bookService.deleteById(book.id);
    window.location.reload();
  }

}
