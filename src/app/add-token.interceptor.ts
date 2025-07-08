import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService, TokenState } from './core/services/token.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService); // 👈 funciona igual

  req = req.clone({
    withCredentials: true
  });

  console.log(req);
  
  return next(req).pipe(
    tap({

      error: (err) => {
        console.error('❌ Error en la respuesta:', err);
        // Aquí puedes manejar errores HTTP
        if (err.status === 401) {
          authService.setToken(TokenState.EXPIRED)
        }
      }
    })
  );
};