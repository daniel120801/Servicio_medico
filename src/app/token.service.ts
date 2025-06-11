import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, interval } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { API_TOKEN } from './core/Utilities/Api';

export enum TokenState {
  VALID = 'valid',
  EXPIRED = 'expired',
  NOASSIGNED = 'no assigned'
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly checkInterval = 1 * (1000 * 60);
  private _tokenObserver = new BehaviorSubject<TokenState>(TokenState.NOASSIGNED);
  public tokenStateObserver$ = this._tokenObserver.asObservable();

  constructor(private httpClient: HttpClient) {}

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
    this._tokenObserver.next(TokenState.VALID);
  }

  verifyTokenIsValid(): Observable<boolean> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this._tokenObserver.next(TokenState.NOASSIGNED);
      return of(false);
    }
    return this.httpClient.get<any>(API_TOKEN, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      map(response => {
        const isValid = response?.status === 'success';
        if (!isValid) {
          this._tokenObserver.next(TokenState.EXPIRED);
          sessionStorage.removeItem('token');
        }
        console.log(response.expires_in);
        
        return isValid;
      }),
      catchError(() => {
        this._tokenObserver.next(TokenState.EXPIRED);
        sessionStorage.removeItem('token');
        return of(false);
      })
    );
  }

  verifyTokenPeriodically(): Observable<boolean> {
    return interval(this.checkInterval).pipe(
      startWith(0),
      switchMap(() => this.verifyTokenIsValid()),
      catchError(() => of(false))
    );
  }
}
