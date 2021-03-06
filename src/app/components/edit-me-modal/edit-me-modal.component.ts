import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Right} from '../../models/rights.model';
import {RightService} from '../../services/right.service';

@Component({
  selector: 'app-edit-me-modal',
  templateUrl: './edit-me-modal.component.html',
})
export class EditMeModalComponent implements OnInit {
  public username: string;
  public email: string;
  public password: string;
  public imgUrl: string;
  public rights: Right;
  public user: User;

  @Input('currentUser')
  set currentUser(value: User) {
    this.user = value;
    this.username = value.username;
    this.email = value.email;
    this.password = value.password;
    this.imgUrl = value.imgUrl;
    this.rights = value.rights;
  }

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private toastr: ToastrService,
              public rightService: RightService) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  close(modal) {
    this.username = this.user.username;
    this.email = this.user.email;
    this.password = this.user.password;
    this.imgUrl = this.user.imgUrl;
    this.rights = this.user.rights;
    modal.close();
  }

  reset() {
    this.username = this.user.username;
    this.email = this.user.email;
    this.password = this.user.password;
    this.imgUrl = this.user.imgUrl;
    this.rights = this.user.rights;
  }

  save(modal) {
    this.toastr.success('Nutzer ' + this.user.username + ' erfolgreich bearbeitet!');
    this.user.username = this.username;
    this.user.email = this.email;
    this.user.password = this.password;
    this.user.imgUrl = this.imgUrl;
    this.user.rights = this.rights;
    this.userService.edit(this.user);
    modal.close();
  }

  setImg(img: string) {
    this.imgUrl = img;
  }

  setRights(rights: Right) {
    this.rights = rights;
  }

  isCurrentRight(rights) {
    return rights === this.rights;
  }

  showFounder(rights: Right) {
    return rights.id < 3 || this.rights.id === 3;
  }

}
