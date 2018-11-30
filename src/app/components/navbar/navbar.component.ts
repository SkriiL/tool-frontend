import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  public currentUser: User;

  constructor(private toastr: ToastrService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
  }

  loggedIn(user: User) {
    console.log(user);
    this.currentUser = user;
  }

  logout() {
    this.toastr.info('Abgemeldet!');
    this.currentUser = undefined;
    sessionStorage.removeItem('id');
    this.router.navigate(['']);
  }

  chat() {
    console.log(this.currentUser.rights);
    if (this.currentUser.rights.canChat) {
      this.router.navigate(['/chat']);
    } else {
      this.toastr.error('Bitte erfragen sie die Rechte bei einem Admin.', 'Sie haben nicht die nötigen Rechte!');
    }
  }

}
