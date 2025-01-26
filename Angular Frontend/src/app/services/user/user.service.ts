import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { User } from '../../models/user/user.model';
import { environment } from '../../../env/environment';
interface credentials {
  email: string;
  password: string | number;
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

  public async logout() {
    this.http
      .post(`${this.url}/auth/logout`, {}, { withCredentials: true })
      .subscribe((msg) => {
        this._credentials$.next({ email: '', password: '' });
      });
  }

  public setCredentials(credentials?: credentials) {
    if (credentials) {
      this._credentials$.next(credentials);
    } else this.logout();
    return this.login();
  }
}
