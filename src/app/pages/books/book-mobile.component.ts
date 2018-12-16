import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../models/book.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookService} from '../../services/book.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-mobile',
  templateUrl: './book-mobile.component.html',
})
export class BookMobileComponent implements OnInit {
  public _book: Book;
  public title: string;
  public author: string;
  public price: string;
  public own: boolean;
  public read: boolean;
  public link: string;
  public searchStr: string;
  public searchedBooks: Book[];

  @Input('book')
  set book(value: Book) {
    this._book = value;
    this.title = value.title;
    this.author = value.author;
    this.price = value.price;
    this.own = value.own;
    this.read = value.read;
    this.link = value.link;
  }

  @Input() new = false;

  constructor(private modalService: NgbModal,
              private bookService: BookService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  reset() {
    this.title = this._book.title;
    this.author = this._book.author;
    this.price = this._book.price;
    this.own = this._book.own;
    this.read = this._book.read;
    this.link = this._book.link;
  }

  close(modal) {
    this.title = undefined;
    this.author = undefined;
    this.price = undefined;
    this.own = undefined;
    this.read = undefined;
    this.link = undefined;
    modal.close();
  }

  save(modal) {
    if (this.new) {
      this.add();
    } else {
      this._book = {
        id: this._book.id,
        title: this.title ? this.title : this._book.title,
        author: this.author ? this.author : this._book.author,
        price: this.price ? this.price : this._book.price,
        own: this.own,
        read: this.read,
        link: this.link ? this.link : this._book.link,
        userId: this._book.userId
      };
      this.bookService.edit(this._book);
      this.toastr.success(this._book.title + ' wurde bearbeitet.');
      this.router.navigate(['/books']);
    }
    this.close(modal);
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
  }

  delete(event) {
    if (event) {
      this.bookService.deleteById(this._book.id);
      this.toastr.success(this._book.title + ' wurde gelöscht!');
    }
  }

  search() {
    const sub = this.bookService.search(this.searchStr).subscribe(bs => {
        this.searchedBooks = bs;
        console.log(bs);
        sub.unsubscribe();
      }
    );
  }

  select(book: Book) {
    console.log('!!!!!!!!!!!!!');
    this.title = book.title;
    this.author = book.author;
    this.price = book.price;
    this.link = book.link;
  }

}
