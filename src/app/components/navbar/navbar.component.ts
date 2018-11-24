import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  public currentUser: User;

  constructor(private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

  loggedIn(user: User) {
    this.currentUser = user;
  }

  logout() {
    this.toastr.info('Abgemeldet!');
    this.currentUser = undefined;
    sessionStorage.removeItem('id');
    this.router.navigate(['']);
  }

}
