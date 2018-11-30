import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
})
export class RegisterModalComponent implements OnInit {
  public username: string;
  public password: string;
  public email: string;
  public imgUrl: string;

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
    this.username = undefined;
    this.password = undefined;
    this.email = undefined;
  }

  save(modal) {
    this.userService.create(this.username, this.email, this.password, this.imgUrl);
    this.toastr.success('Sie können sich jetzt anmelden.', 'Nutzer ' + this.username + ' wurde erstellt.');
    this.username = undefined;
    this.password = undefined;
    this.email = undefined;
    modal.close();
  }

  setImg(img: string) {
    this.imgUrl = img;
  }

}
