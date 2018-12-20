import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  public users: User[];
  public selectedUser: User;
  public currentUser: User;
  public isDesktop: boolean;

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.isDesktop = sessionStorage.getItem('isDesktop') === '1';
    this.userService.getAll().subscribe(us => this.users = us);
    this.userService.getSingleById(parseInt(sessionStorage.getItem('id'), 10)).subscribe( u => {
      this.currentUser = u;
    }
    );
  }

  select(user: User) {
    if (this.currentUser.rights.canModifyOthers && this.currentUser.rights.id > user.rights.id || this.currentUser.id === user.id) {
      this.selectedUser = user;
    }
  }

  close() {
    this.selectedUser = undefined;
  }

  delete(user, event) {
    if (event) {
      this.userService.deleteById(user.id);
      this.userService.getAll().subscribe(us => this.users = us);
      this.toastr.success('Nutzer ' + user.username + ' wurde gelöscht.');
    }
  }

}
