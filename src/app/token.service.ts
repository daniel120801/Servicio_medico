import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, interval, map, Observable, of, startWith, switchMap } from 'rxjs';
import { API_TOKEN } from './core/Utilities/Api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  checkInterval = 300000;

  private _tokenObserver = new BehaviorSubject<TokenState>(TokenState.NOASSIGNED);
  public tokenObserver$ = this._tokenObserver.asObservable();



  constructor(private httpClient: HttpClient) {}


  setToken(token: string) {
    console.log('token setted');

    sessionStorage.setItem('token', token);
    this._tokenObserver.next(TokenState.VALID);
  }

  verifyTokenIsValid(): Observable<boolean> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    const headers = { Authorization: `Bearer ${token}` };

    return this.httpClient.get(API_TOKEN, { headers }).pipe(
      map((response: any) => {
      if (response === null || response === undefined || response.status === undefined || response.status === 'failed') {
        console.log('response is corrupted');
        
        return false;
      }
      return response.status === 'success';
      }),
      catchError(() => of(false))
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

export enum TokenState {
  VALID = 'valid',
  INVALID = 'invalid',
  EXPIRED = 'expired',
  NOASSIGNED = 'no assigned'
} 