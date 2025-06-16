import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/services/token.service';

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
