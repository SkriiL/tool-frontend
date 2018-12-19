import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../models/user.model';
import {Right} from '../../models/rights.model';
import {UserService} from '../../services/user.service';
import {RightService} from '../../services/right.service';

@Component({
  selector: 'app-user-mobile',
  templateUrl: './user-mobile.component.html',
})
export class UserMobileComponent implements OnInit {
  public _user: User;
  public username: string;
  public email: string;
  public rights: Right;

  @Input('user')
  set user(value: User) {
    this._user = value;
    this.username = value.username;
    this.email = value.email;
    this.rights = value.rights;
  }

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              public rightService: RightService) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  reset() {
    this.username = this._user.username;
    this.email = this._user.email;
    this.rights = this._user.rights;
  }

  close(modal, reset) {
    modal.close();
    if (reset) {
      this.reset();
    }
  }

  save(modal) {
    console.log(this.rights);
    this._user = {
      id: this._user.id,
      username: this.username ? this.username : this._user.username,
      email: this.email ? this.email : this._user.email,
      password: this._user.password,
      rights: this.rights ? this.rights : this._user.rights,
      imgUrl: this._user.imgUrl,
    };
    this.userService.edit(this._user);
    this.toastr.success(this._user.username + ' wurde bearbeitet.');
    this.router.navigate(['/users']);
    this.close(modal, false);
  }

  delete(event) {
    if (event) {
      this.userService.deleteById(this._user.id);
      this.toastr.success(this._user.username + ' wurde gelöscht!');
    }
  }

  setRights(right: Right) {
    this.rights = right;
  }
}
