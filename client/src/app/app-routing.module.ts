import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { bookResolver } from './resolvers/book.resolver';
import { BookTxtComponent } from './cmps/books-components/book-txt/book-txt.component';
import { bookTxtResolver } from './resolvers/book-txt.resolver';
import { SingUpPageComponent } from './pages/auth/sing-up-page/sing-up-page.component';
import { ConfirmEmailComponent } from './pages/auth/confirm-email/confirm-email.component';
import { emailStatusResolver } from './resolvers/email-status.resolver';
import { RequestResetPassPageComponent } from './pages/auth/request-reset-pass-page/request-reset-pass-page.component';
import { tokenResolver } from './resolvers/token.resolver';
import { ResetPassPageComponent } from './pages/auth/reset-pass-page/reset-pass-page.component';
import { userResolver } from './resolvers/user.resolver';

const routes: Routes = [
  {
    path: 'book/:id',
    component: BookDetailsComponent,
    resolve: { book: bookResolver },
  },
  {
    path: 'book/:id/txt',
    component: BookTxtComponent,
    resolve: { book: bookTxtResolver },
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'resetPassword', component: RequestResetPassPageComponent },
  {
    path: 'resetPassword/:token',
    component: ResetPassPageComponent,
    resolve: { tokenStatus: tokenResolver },
  },
  { path: 'signup', component: SingUpPageComponent },
  {
    path: 'confirm/:email',
    component: ConfirmEmailComponent,
    resolve: { emailStatus: emailStatusResolver },
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    resolve: { user: userResolver },
  },
  {
    path: '',
    pathMatch: 'full',
    component: SearchPageComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
