import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  public currentUser: User;
  public isDesktop: boolean;
  public isCollapsed = true;

  constructor(private toastr: ToastrService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.isDesktop = sessionStorage.getItem('isDesktop') === '1';
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

  chat() {
    if (this.currentUser.rights.canChat) {
      this.router.navigate(['/chat']);
    } else {
      this.toastr.error('Bitte erfragen sie die Rechte bei einem Admin.', 'Sie haben nicht die nötigen Rechte!');
    }
    this.toggle();
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
