import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HeaderComponent } from './cmps/header/header.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { provideHttpClient } from '@angular/common/http';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RequestResetPassPageComponent } from './pages/auth/request-reset-pass-page/request-reset-pass-page.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './cmps/pagination/pagination.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BooksComponent } from './cmps/books-components/books/books.component';
import { BookPreviewComponent } from './cmps/books-components/book-preview/book-preview.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { BookTxtComponent } from './cmps/books-components/book-txt/book-txt.component';
import { BooksQuotesComponent } from './cmps/books-components/books-quotes/books-quotes.component';
import { SearchPanelComponent } from './cmps/search-panel/search-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingUpPageComponent } from './pages/auth/sing-up-page/sing-up-page.component';
import { ConfirmEmailComponent } from './pages/auth/confirm-email/confirm-email.component';
import { ResetPassPageComponent } from './pages/auth/reset-pass-page/reset-pass-page.component';
import { LoadingComponent } from './cmps/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    HeaderComponent,
    ProfilePageComponent,
    LoginPageComponent,
    SingUpPageComponent,
    RequestResetPassPageComponent,
    PaginationComponent,
    BooksComponent,
    BookPreviewComponent,
    BookDetailsComponent,
    BookTxtComponent,
    BooksQuotesComponent,
    SearchPanelComponent,
    ConfirmEmailComponent,
    ResetPassPageComponent,
    LoadingComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
