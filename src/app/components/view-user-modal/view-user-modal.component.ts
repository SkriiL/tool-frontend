import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-user-modal',
  templateUrl: './view-user-modal.component.html',
})
export class ViewUserModalComponent implements OnInit {

  @Input() user: User;

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  close(modal) {
    modal.close();
  }
}
