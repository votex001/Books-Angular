import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BooksService } from '../services/books/books.service';

export const bookTxtResolver: ResolveFn<string> = (route, state) => {
  const id = route.params['id'];

  return inject(BooksService).getBookTxt(id);
};
