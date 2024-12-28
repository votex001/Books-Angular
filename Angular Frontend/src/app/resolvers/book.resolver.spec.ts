import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { bookResolver } from './book.resolver';
import { Book } from '../models/book/book.model';

describe('bookResolver', () => {
  const executeResolver: ResolveFn<Book> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => bookResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
