import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs';

export const tokenResolver: ResolveFn<{}> = (route, state) => {
  const token = route.params['token'];
  return inject(UserService).verifyResetToken(token);
};
