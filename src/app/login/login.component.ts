import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/services/token.service';

/**
 * Componente de login para la autenticación de usuarios.
 *
 * @remarks
 * Este componente proporciona un formulario reactivo para que los usuarios ingresen su nombre de usuario y contraseña.
 * Utiliza `AuthService` para validar las credenciales y manejar la respuesta del servidor.
 *
 * @example
 * <app-login></app-login>
 *
 * @property {FormGroup} loginForm - Formulario reactivo que contiene los campos de usuario y contraseña.
 * @property {string} message - Mensaje de estado para mostrar errores o información al usuario.
 *
 * @constructor
 * @param {FormBuilder} fb - Servicio para construir el formulario reactivo.
 * @param {AuthService} authService - Servicio de autenticación para validar las credenciales.
 *
 * @method onSubmit
 * Envía el formulario de login. Valida los campos requeridos y realiza la autenticación.
 * Actualiza el mensaje de estado según el resultado de la autenticación o errores de red.
 */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: []
})
export class LoginComponent {


  loginForm: FormGroup;
  message = '';
  constructor(private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.message = '';
    if (!this.loginForm.valid) {
      this.message = 'campos faltantes'
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(username, password).subscribe(
      {
        next: response => {
          if (!response || !response.token) {
            this.message = 'usuario o contraseña incorrecta';
          }
        },
        error: error => {
          console.log('error:', error);

          if (error.name === "HttpErrorResponse") {

            this.message = 'error de red';
          }
        }
      }
    );

  }
}
