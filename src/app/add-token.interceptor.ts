import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService, TokenState } from './core/services/token.service';

/**
 * Interceptor que agrega credenciales a las solicitudes HTTP y maneja errores de autenticación.
 *
 * @remarks
 * Este interceptor utiliza el servicio de autenticación (`AuthService`) para gestionar el estado del token.
 * Clona cada solicitud HTTP para incluir las credenciales (`withCredentials: true`), lo que permite enviar cookies
 * y encabezados de autenticación automáticamente. Además, intercepta errores en las respuestas HTTP, especialmente
 * el código de estado 401 (no autorizado), para actualizar el estado del token a expirado.
 *
 * @example
 * ```typescript
 * // Agregar el interceptor en el proveedor de HTTP_INTERCEPTORS
 * providers: [
 *   { provide: HTTP_INTERCEPTORS, useValue: addTokenInterceptor, multi: true }
 * ]
 * ```
 *
 * @method
 * - Intercepta solicitudes HTTP y las clona con credenciales.
 * - Maneja errores en las respuestas, actualizando el estado del token si es necesario.
 *
 * @variable
 * - `authService`: Instancia del servicio de autenticación para gestionar el estado del token.
 */
export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService); 

  req = req.clone({
    withCredentials: true
  });

  //console.log(req);
  
  return next(req).pipe(
    tap({

      error: (err) => {
        console.error('❌ Error en la respuesta:', err);
   
      }
    })
  );
};