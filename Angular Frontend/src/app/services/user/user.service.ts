import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
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
  }>({ email: '', password: '' });
  public credentials$ = this._credentials$.asObservable();

  public login() {
    return this.credentials$.pipe(
      switchMap(({ email, password }) => {
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
    return this.http.post(`${this.url}/auth/signup`, credentials, {
      withCredentials: true,
    });
  }

  public logout() {
    return this.http
      .post(`${this.url}/auth/logout`, {}, { withCredentials: true })
      .subscribe((msg) => {
        // this._credentials$.next({ email: '', password: '' });
      });
  }

  public emailStatus(email: string) {
    return this.http
      .post<emailStatus>(`${this.url}/auth/email-status`, { email })
      .pipe(
        retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  public setCredentials(credentials?: credentials) {
    if (credentials) {
      this.logout();
      this._credentials$.next(credentials);
    }
    return this.login();
  }

  public confirmNewEmail(confirmCredentials: confirmCredentials) {
    console.log(confirmCredentials);
    return this.http.post(
      `${this.url}/auth/confirm-email`,
      confirmCredentials,
      { withCredentials: true }
    );
  }

  public resendConfirmCode(email: string) {
    return this.http.post(`${this.url}/auth/resend-code`, { email });
  }
}
