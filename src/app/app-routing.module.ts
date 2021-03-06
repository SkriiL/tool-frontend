import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BooksComponent} from './pages/books/books.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ChatComponent} from './pages/chat/chat.component';
import {UsersComponent} from './pages/users/users.component';
import {MathsComponent} from './pages/maths/maths.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'books', component: BooksComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'users', component: UsersComponent},
  {path: 'maths', component: MathsComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule { }
