import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  first,
  map,
  of,
  retry,
  switchMap,
  throwError,
} from 'rxjs';
import { User } from '../../models/user/user.model';
import { environment } from '../../../env/environment';

interface credentials {
  email: string;
  password: string | number;
}

export interface emailStatus {
  exist: boolean;
  isVerified?: boolean;
}

interface confirmCredentials {
  email: string;
  code: string | number;
}

interface resetPassCred {
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private url = environment.apiUrl;

  private _user$ = new BehaviorSubject<User | null>(null);
  public user$ = this._user$.asObservable();

  private _credentials$ = new BehaviorSubject<{
    email: string;
    password: string | number;
    logout?: true;
  }>({ email: '', password: '' });
  public credentials$ = this._credentials$.asObservable();

  public login() {
    return this.credentials$.pipe(
      switchMap(({ email, password, logout }) => {
        if (logout) {
          return of(null);
        }
        if (email && password) {
          return this.http
            .post<User>(
              `${this.url}/auth/login`,
              { email, password },
              { withCredentials: true }
            )
            .pipe(
              catchError((msg) => {
                console.error('Login error:', msg);
                if (msg.status === 401) return of(null);
                else
                  throw {
                    err: 'Connection problems please try again later',
                    serverProblem: true,
                  }; // Or handle accordingly
              })
            );
        } else {
          return this.http
            .post<User>(
              `${this.url}/user/verifyToken`,
              {},
              { withCredentials: true }
            )
            .pipe(
              catchError((error) => {
                console.error('Token verification error:', error);
                return of(null); // Or handle accordingly
              })
            );
        }
      })
    );
  }

  public signUp(credentials: credentials & { fullName: string }) {
    return this.http
      .post(`${this.url}/auth/signup`, credentials, {
        withCredentials: true,
      })
      .pipe(first());
  }

  public logout() {
    this._credentials$.next({ logout: true, email: '', password: '' });
    return this.http
      .post(`${this.url}/auth/logout`, {}, { withCredentials: true })
      .pipe(first())
      .subscribe({
        next: (msg) => {
        },
        error: (err) => console.error('Logout failed:', err),
      });
  }

  public emailStatus(email: string) {
    return this.http
      .post<emailStatus>(`${this.url}/auth/email-status`, { email })
      .pipe(
        first(),
        retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  public setCredentials(credentials?: credentials) {
    if (credentials) {
      this._credentials$.next(credentials);
    }
    return this.login();
  }

  public confirmNewEmail(confirmCredentials: confirmCredentials) {
    return this.http
      .post(`${this.url}/auth/confirm-email`, confirmCredentials, {
        withCredentials: true,
      })
      .pipe(first());
  }

  public resendConfirmCode(email: string) {
    return this.http
      .post(`${this.url}/auth/resend-code`, { email })
      .pipe(first());
  }

  public sendResetPassword(email: string) {
    return this.http
      .post(`${this.url}/auth/request-password-reset`, { email })
      .pipe(first());
  }

  public verifyResetToken(token: string) {
    return this.http
      .post(`${this.url}/auth/verify-reset-token`, { token })
      .pipe(first());
  }

  public resetPassword(resetCredentials: resetPassCred) {
    return this.http
      .post(`${this.url}/auth/reset-password`, resetCredentials)
      .pipe(first());
  }

  public updateUserPhoto(user: User, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);

    return this.http
      .post(
        `https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`,
        formData
      )
      .pipe(
        first(),
        switchMap((ans: any) => {
          return this.http.put(
            `${this.url}/user`,
            {
              ...user,
              imgUrl: ans.url,
            },
            { withCredentials: true }
          );
        })
      );
  }
}
