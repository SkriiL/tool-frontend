import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
import { ChatComponent } from './pages/chat/chat.component';
import {MessageService} from './services/message.service';
import { MessageComponent } from './components/message/message.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ChatDateComponent } from './components/chat-date/chat-date.component';
import { ViewUserModalComponent } from './components/view-user-modal/view-user-modal.component';
import { ImgPickerModalComponent } from './components/img-picker-modal/img-picker-modal.component';
import { UsersComponent } from './pages/users/users.component';
import { UserEditComponent } from './pages/users/user-edit.component';
import { ReallyModalComponent } from './components/really-modal/really-modal.component';
import { MathsComponent } from './pages/maths/maths.component';
import { PolynomialComponent } from './components/polynomial/polynomial.component';
import {MathsService} from './services/maths.service';
import { MathFunctionPipe } from './pipes/math-function.pipe';
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
    ChatComponent,
    MessageComponent,
    DateFormatPipe,
    ChatDateComponent,
    ViewUserModalComponent,
    ImgPickerModalComponent,
    UsersComponent,
    UserEditComponent,
    ReallyModalComponent,
    MathsComponent,
    PolynomialComponent,
    MathFunctionPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [UserService, BookService, MessageService, MathsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
