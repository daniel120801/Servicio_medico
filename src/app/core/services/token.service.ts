import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, interval } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { API_LOGIN, API_TOKEN_REFRESH, API_TOKEN_VERIFIER } from '../Utilities/Api';

export enum TokenState {
  VALID = 'valid',
  EXPIRED = 'expired',
  NOASSIGNED = 'no assigned'
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _tokenObserver = new BehaviorSubject<TokenState>(TokenState.NOASSIGNED);
  public tokenStateObserver$ = this._tokenObserver.asObservable();

  constructor(private http: HttpClient) { }

  setToken(token: TokenState): void {
    this._tokenObserver.next(token);
  }




  login(username: string, password: string): Observable<any> {
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);

    return this.http.post<any>(API_LOGIN, body).pipe(
      tap({
        next: (response) => {
          if (response.status === 'success') {
            this.setToken(TokenState.VALID);
          }
        },
      })
    );
  }

  logout(): Observable<any> {
    this.setToken(TokenState.EXPIRED)
    return this.http.get<any>(API_LOGIN + "?logout=", {});

  }
}
