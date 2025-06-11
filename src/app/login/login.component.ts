import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../core/services/login.service';
import { AuthService } from '../token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService]
})
export class LoginComponent {


  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {

    if (!this.loginForm.valid) return;

    console.log('Form submitted:', this.loginForm.value);
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.loginService.login(username, password).subscribe(
      {
        next: response => {

          console.log('login response: ',response);
          
          if (!response || !response.token) {
            console.log('sin respuesta del servidor');
          }
          if (response.status === 'success') {
            console.log('token sended');
            
            this.authService.setToken(response.token);
            
          }
        },
        error: error => {
          console.log('error: ', error);

        }
      }
    );

  }
}
