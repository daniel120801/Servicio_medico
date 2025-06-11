import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../core/services/login.service';
import { AuthService } from '../token.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService]
})
export class LoginComponent {


  loginForm: FormGroup;
  message = '';
  constructor(private fb: FormBuilder,
    private loginService: LoginService,
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
    this.loginService.login(username, password).subscribe(
      {
        next: response => {
          if (!response || !response.token) {
            this.message = 'usuario o contraseña incorrecta';
          }
          if (response.status === 'success') {
            this.authService.setToken(response.token);
          }
        },
        error: error => {
          console.log('error:', error);
          if(error.name === "HttpErrorResponse"){

            this.message = 'error de red';
          }
        }
      }
    );

  }
}
