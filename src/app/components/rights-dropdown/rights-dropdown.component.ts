import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Right, RIGHTS} from '../../models/rights.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rights-dropdown',
  template: `
    <ng-template #content let-modal>
      <div class="modal-body">
        <table class="table table-striped">
          <tbody>
          <tr  *ngFor="let right of rights" style="height: 50px" (click)="select(right, modal)">
            <span class="own-dropdown-item">{{ right.name }}</span>
          </tr>
          </tbody>
        </table>
      </div>
    </ng-template>

    <button class="btn btn-outline-secondary form-control" (click)="open(content)">
      {{ currentRight.name }} <i class="fa fa-angle-down"></i>
    </button>
  `,
})
export class RightsDropdownComponent implements OnInit {
  @Input() currentRight: Right;

  @Output() selected = new EventEmitter<Right>();

  public rights = RIGHTS;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  select(right, modal) {
    this.currentRight = right;
    this.selected.emit(right);
    this.close(modal);
  }

  close(modal) {
    modal.close();
  }

}
