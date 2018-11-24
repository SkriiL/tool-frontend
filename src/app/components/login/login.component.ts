import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  template: `
    <form>
      <div class="row">
        <div class="col">
          <input [(ngModel)]="username" name="username" type="text" class="form-control" placeholder="Nutzername">
        </div>
        <div class="col">
          <input [(ngModel)]="password" name="password" type="password" class="form-control" placeholder="Passwort">
        </div>
        <div class="col">
          <button (click)="login()" class="btn btn-outline-primary">Login</button>
        </div>
      </div>
    </form>
  `,
})
export class LoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<User>();
  public username: string;
  public password: string;

  constructor(private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  login() {
    const sub = this.userService.getSingleByUsername(this.username).subscribe(u => {
      if (u.id !== -1) {
        if (u.password === this.password) {
          this.toastr.success('Login erfolgreich!');
          sessionStorage.removeItem('id');
          sessionStorage.setItem('id', u.id.toString());
          this.loggedIn.emit(u);
          sub.unsubscribe();
        } else {
          this.toastr.error('Falsches Passwort.', 'Login fehlgeschlagen!');
          sub.unsubscribe();
        }
      } else {
        this.toastr.error('Nutzer existiert nicht.', 'Login fehlgeschlagen!');
        sub.unsubscribe();
      }
    });
  }

}
