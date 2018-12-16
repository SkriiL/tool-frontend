import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Book} from '../../models/book.model';

@Component({
  selector: 'app-book-dropdown',
  template: `
    <ng-template #content let-modal>
      <div class="modal-header">
        <span>Buch auswählen</span>
        <button class="btn btn-transparent" (click)="close(modal)"><i class="fa fa-times text-danger"></i></button>
      </div>
      <div class="modal-body">
        <table class="table table-striped">
          <tbody>
          <tr  *ngFor="let book of books" (click)="select(book, modal)">
            <strong>{{ book.title }}</strong><br>
            <span>{{ book.author }}</span>
          </tr>
          </tbody>
        </table>
      </div>
    </ng-template>

    <button class="btn btn-outline-secondary form-control" [disabled]="!books" (click)="open(content)">
      Buch auswählen <i class="fa fa-angle-down"></i>
    </button>
  `,
})
export class BookDropdownComponent implements OnInit {
  @Input() books: Book[];

  @Output() selected = new EventEmitter<Book>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  select(book: Book, modal) {
    this.selected.emit(book);
    this.close(modal);
  }

  close(modal) {
    modal.close();
  }
}
