import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService, TokenState } from './core/services/token.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req);
  const authService = inject(AuthService); // 👈 funciona igual

  req = req.clone({
    withCredentials: true
  });


  return next(req).pipe(
    tap({
      next: (event) => {
        console.log('✅ Respuesta recibida:', event);
        // Aquí puedes manejar respuestas exitosas
      },
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