import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loadingStatus$ = new BehaviorSubject<boolean>(false);
  public loadingStatus$ = this._loadingStatus$
    .asObservable()
    .pipe(distinctUntilChanged());

  public setLoading(value: boolean) {
    this._loadingStatus$.next(value);
  }
}
