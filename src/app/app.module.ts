import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './pages/books/books.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {UserService} from './services/user.service';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BookEditComponent } from './pages/books/book-edit.component';
import {BookService} from './services/book.service';
import { CurrencyPipe } from './pipes/currency.pipe';
import { TrueFalsePipe } from './pipes/true-false.pipe';
import { EditMeModalComponent } from './components/edit-me-modal/edit-me-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    RegisterModalComponent,
    BookEditComponent,
    CurrencyPipe,
    TrueFalsePipe,
    EditMeModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [UserService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
