import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from '../../models/book.model';
import {BookService} from '../../services/book.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
})
export class BookEditComponent implements OnInit {
  public title: string;
  public author: string;
  public price: string;
  public own: boolean;
  public read: boolean;
  public link: string;
  public _book: Book;

  public def;

  @Output() clicked = new EventEmitter<boolean>();

  @Input('book')
  set book(value: Book) {
    if (value) {
      this._book = value;
      this.title = value.title;
      this.author = value.author;
      this.price = value.price;
      this.own = value.own;
      this.read = value.read;
      this.link = value.link;
    }
  }

  @Input() new: boolean;

  constructor(private bookService: BookService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

  edit() {
    if (this.new) {
      this.add();
    } else {
      this._book.title = this.title ? this.title : this._book.title;
      this._book.author = this.author ? this.author : this._book.author;
      this._book.price = this.price ? this.price : this._book.price;
      this._book.own = this.own ? this.own : this._book.own;
      this._book.read = this.read ? this.read : this._book.read;
      this._book.link = this.link ? this.link : this._book.link;
      this.bookService.edit(this._book);
      this.toastr.success(this._book.title + ' wurde bearbeitet.');
      this.router.navigate(['/books']);
      this.close(true);
    }
  }

  reset() {
    this.title = this._book.title;
    this.author = this._book.author;
    this.price = this._book.price;
    this.own = this._book.own;
    this.read = this._book.read;
    this.link = this._book.link;
  }

  close(value) {
    this.clicked.emit(value);
    this._book = undefined;
  }

  add() {
    this._book.title = this.title ? this.title : '';
    this._book.author = this.author ? this.author : '';
    this._book.price = this.price ? this.price : '';
    this._book.own = this.own ? this.own : false;
    this._book.read = this.read ? this.read : false;
    this._book.link = this.link ? this.link : '';
    this._book.userId = parseInt(sessionStorage.getItem('id'), 10);
    this.bookService.add(this._book.title, this._book.author, this._book.price, this._book.own,
      this._book.read, this._book.link, this._book.userId);
    this.toastr.success(this._book.title + ' wurde hinzugefügt.');
    this.close(true);
  }

}
