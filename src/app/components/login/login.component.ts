import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  template: `
    <form *ngIf="isDesktop">
      <div class="row">
        <div class="col">
          <input [(ngModel)]="username" name="username" type="text" class="form-control" placeholder="Nutzername">
        </div>
        <div class="col">
          <input [(ngModel)]="password" name="password" type="password" class="form-control" placeholder="Passwort">
        </div>
        <div class="col">
          <button (click)="login(false)" class="btn btn-outline-primary">Login</button>
        </div>
      </div>
    </form>

    <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">Login</h4>
      </div>
      <div class="modal-body">
        <form>
          <label for="username">Nutzername</label>
          <input class="form-control" [(ngModel)]="usernameM" name="username" id="username">
          <label for="password">Passwort</label>
          <input class="form-control" type="password" [(ngModel)]="passwordM" name="password" id="password">
        </form>
      </div>
      <div class="modal-footer justify-content-between">
        <button type="button" class="btn btn-outline-danger" (click)="close(modal)">Abbrechen</button>
        <button type="button" class="btn btn-outline-primary" (click)="login(modal)">Login</button>
      </div>
    </ng-template>

    <button *ngIf="!isDesktop" (click)="open(content)" class="btn btn-outline-primary">Login</button>
  `,
})
export class LoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<User>();
  public username: string;
  public password: string;
  public usernameM: string;
  public passwordM: string;
  public isDesktop: boolean;

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.isDesktop = sessionStorage.getItem('isDesktop') === '1';
  }

  login(modal) {
    if (modal) {
      const sub = this.userService.getSingleByUsername(this.usernameM).subscribe(u => {
        if (u.id !== -1) {
          if (u.password === this.passwordM) {
            this.toastr.success('Login erfolgreich!');
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
      this.close(modal);
    } else {
      const sub = this.userService.getSingleByUsername(this.username).subscribe(u => {
        if (u.id !== -1) {
          if (u.password === this.password) {
            this.toastr.success('Login erfolgreich!');
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  close(modal) {
    modal.close();
    this.username = undefined;
    this.password = undefined;
  }

}
