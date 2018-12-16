import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Book} from '../../models/book.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  public selectedBook: Book;
  public books: Observable<Book[]>;
  public new: boolean;
  public isDesktop: boolean;
  public newBook = new Book();

  constructor(private bookService: BookService,
              private toastr: ToastrService) { }

  ngOnInit() {
    const id = parseInt(sessionStorage.getItem('id'), 10);
    this.isDesktop = sessionStorage.getItem('isDesktop') === '1';
    this.books = this.bookService.getAllForUser(id);
  }

  select(book: Book) {
    this.new = false;
    this.selectedBook = book;
  }

  close(clicked) {
    this.selectedBook = undefined;
    if (clicked) {
      this.books = this.bookService.getAllForUser(parseInt(sessionStorage.getItem('id'), 10));
    }
  }

  add() {
    this.new = true;
    this.selectedBook = new Book();
    this.selectedBook.id = 0;
  }

  delete(book: Book, event: boolean) {
    if (event) {
      this.bookService.deleteById(book.id);
      this.books = this.bookService.getAllForUser(parseInt(sessionStorage.getItem('id'), 10));
      this.toastr.success(book.title + ' wurde gelöscht!');
    }
  }
}
