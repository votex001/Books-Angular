import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { emailStatusResolver } from './email-status.resolver';
import { emailStatus } from '../services/user/user.service';

describe('emailStatusResolver', () => {
  const executeResolver: ResolveFn<emailStatus> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      emailStatusResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
