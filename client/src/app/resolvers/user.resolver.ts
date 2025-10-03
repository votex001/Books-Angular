import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { catchError, map, of } from 'rxjs';

export const userResolver: ResolveFn<boolean | null> = (route, state) => {
  const router = inject(Router);
  return inject(UserService)
    .login()
    .pipe(
      map((ans: any) => {
        if (ans) {
          return ans;
        } else {
          router.navigate(['/login']); // Redirect to login if no user
          return null;
        }
      }),
      catchError(() => {
        router.navigate(['/login']); // Handle error and redirect
        return of(null);
      })
    );
};
