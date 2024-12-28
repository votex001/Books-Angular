import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { bookTxtResolver } from './book-txt.resolver';

describe('bookTxtResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => bookTxtResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
