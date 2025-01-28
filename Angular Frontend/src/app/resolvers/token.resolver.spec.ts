import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tokenResolver } from './token.resolver';
import { Observable } from 'rxjs';

describe('tokenResolver', () => {
  const executeResolver: ResolveFn<Object> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => tokenResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
