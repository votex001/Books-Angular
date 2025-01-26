import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { emailStatus, UserService } from '../services/user/user.service';

export const emailStatusResolver: ResolveFn<emailStatus> = (route, state) => {
  const email = route.params['email'];
  return inject(UserService).emailStatus(email);
};
