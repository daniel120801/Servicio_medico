import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, interval } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { API_SESSION, API_TOKEN_REFRESH, API_TOKEN_VERIFIER } from '../Utilities/Api';

export enum TokenState {
  VALID = 'valid',
  EXPIRED = 'expired',
  NOASSIGNED = 'no assigned'
}


/**
 * Servicio de autenticación para gestionar el estado del token y las operaciones de login/logout.
 *
 * @remarks
 * Esta clase centraliza la lógica relacionada con la autenticación de usuarios en la aplicación.
 * Utiliza un `BehaviorSubject` para emitir cambios en el estado del token, permitiendo que otros
 * componentes se suscriban y reaccionen ante cambios de autenticación. Provee métodos para iniciar
 * sesión (`login`), cerrar sesión (`logout`) y actualizar el estado del token (`setToken`).
 *
 * @example
 * ```typescript
 * // Suscribirse al estado del token
 * authService.tokenStateObserver$.subscribe(state => {
 *   if (state === TokenState.VALID) {
 *     // El usuario está autenticado
 *   }
 * });
 *
 * // Iniciar sesión
 * authService.login('usuario', 'contraseña').subscribe(response => {
 *   // Manejar respuesta de login
 * });
 *
 * // Cerrar sesión
 * authService.logout().subscribe(() => {
 *   // Manejar cierre de sesión
 * });
 * ```
 *
 * @property _tokenObserver - BehaviorSubject que mantiene el estado actual del token.
 * @property tokenStateObserver$ - Observable para suscribirse a los cambios de estado del token.
 * @method setToken - Actualiza el estado del token.
 * @method login - Realiza la autenticación del usuario.
 * @method logout - Cierra la sesión del usuario.
 */
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

    return this.http.post<any>(API_SESSION + "?login=", body).pipe(
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
    
    return this.http.get<any>(API_SESSION + "?logout=");

  }
}
