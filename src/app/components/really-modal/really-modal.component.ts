import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-really-modal',
  template: `
    <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">{{ title }}</h4>
      </div>
      <div class="modal-body">
        {{ modalContent }}
      </div>
      <div class="modal-footer row justify-content-between">
        <button type="button" class="btn btn-outline-danger col-5 ml-2" (click)="dismiss(modal)">Abbrechen</button>
        <button type="button" class="btn btn-outline-primary col-5 mr-2" (click)="yes(modal)">Ja</button>
      </div>
    </ng-template>

    <button (click)="open(content)" [class]="buttonClass">{{ buttonText }}<i *ngIf="iconClass" [class]="iconClass"></i></button>

  `,
})
export class ReallyModalComponent implements OnInit {
  @Input() title: string;
  @Input() modalContent: string;
  @Input() buttonText = '';
  @Input() buttonClass: string;
  @Input() iconClass: string;
  @Output() answer = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  dismiss(modal) {
    this.answer.emit(false);
    modal.close();
  }

  yes(modal) {
    this.answer.emit(true);
    modal.close();
  }

}
