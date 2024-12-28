import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HeaderComponent } from './cmps/header/header.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { provideHttpClient } from '@angular/common/http';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { SingInPageComponent } from './pages/auth/sing-in-page/sing-in-page.component';
import { ResetPassPageComponent } from './pages/auth/reset-pass-page/reset-pass-page.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BooksComponent } from './cmps/books/books.component';
import { BookPreviewComponent } from './cmps/book-preview/book-preview.component';
import { BookDetailsComponent } from './cmps/book-details/book-details.component';
import { BookTxtComponent } from './cmps/book-txt/book-txt.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    HeaderComponent,
    ProfilePageComponent,
    LoginPageComponent,
    SingInPageComponent,
    ResetPassPageComponent,
    PaginationComponent,
    BooksComponent,
    BookPreviewComponent,
    BookDetailsComponent,
    BookTxtComponent
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
