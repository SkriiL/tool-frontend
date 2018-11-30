import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-img-picker-modal',
  templateUrl: './img-picker-modal.component.html',
})
export class ImgPickerModalComponent implements OnInit {
  @Output() imgUrl = new EventEmitter<string>();

  @Input() current: string;

  public imgs = ['stop.png', 'smiley.png', 'thefinger.png'];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  close(modal) {
    modal.close();
  }

  pick(img: string, modal) {
    this.imgUrl.emit(img);
    this.close(modal);
  }
}
