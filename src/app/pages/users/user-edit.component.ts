import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/user.model';
import {Right} from '../../models/rights.model';
import {RightService} from '../../services/right.service';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
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

  @Output() clicked = new EventEmitter<boolean>();

  constructor(public rightService: RightService,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

  setRights(right: Right) {
    this.rights = right;
  }

  isCurrentRight(right) {
    return right === this._user.rights;
  }

  edit() {
    this._user.username = this.username ? this.username : this._user.username;
    this._user.email = this.email ? this.email : this._user.email;
    this._user.rights = this.rights ? this.rights : this._user.rights;
    this.userService.edit(this._user);
    this.toastr.success(this._user.username + ' wurde bearbeitet.');
    this.router.navigate(['/users']);
    this.close();
  }

  close() {
    this.clicked.emit(true);
    this._user = undefined;
  }

  reset() {
    this.username = this._user.username;
    this.rights = this._user.rights;
    this.email = this._user.email;
  }

}
