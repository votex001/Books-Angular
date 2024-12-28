import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BooksService } from '../services/books/books.service';
import { Book } from '../models/book/book.model';
import { tap } from 'rxjs';

export const bookResolver: ResolveFn<Book> = (route, state) => {
  const id = route.params['id'];
  return inject(BooksService).getById(id).pipe();
};
