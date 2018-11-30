import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-me-modal',
  templateUrl: './edit-me-modal.component.html',
})
export class EditMeModalComponent implements OnInit {
  public username: string;
  public email: string;
  public password: string;
  public imgUrl: string;
  public user: User;

  @Input('currentUser')
  set currentUser(value: User) {
    this.user = value;
    this.username = value.username;
    this.email = value.email;
    this.password = value.password;
    this.imgUrl = value.imgUrl;
  }

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  close(modal) {
    this.username = undefined;
    this.email = undefined;
    this.password = undefined;
    this.imgUrl = undefined;
    modal.close();
  }

  save(modal) {
    this.toastr.success('Nutzer ' + this.user.username + ' erfolgreich bearbeitet!');
    this.user.username = this.username;
    this.user.email = this.email;
    this.user.password = this.password;
    this.user.imgUrl = this.imgUrl;
    this.userService.edit(this.user);
    modal.close();
  }

  setImg(img: string) {
    this.imgUrl = img;
  }

}
