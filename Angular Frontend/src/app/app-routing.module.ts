import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { BookDetailsComponent } from './cmps/books-components/book-details/book-details.component';
import { bookResolver } from './resolvers/book.resolver';
import { BookTxtComponent } from './cmps/books-components/book-txt/book-txt.component';
import { bookTxtResolver } from './resolvers/book-txt.resolver';
import { SingUpPageComponent } from './pages/auth/sing-up-page/sing-up-page.component';

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
  { path: 'singup', component: SingUpPageComponent },
  { path: 'profile', component: ProfilePageComponent },
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
