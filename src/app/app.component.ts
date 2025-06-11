import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService, TokenState } from './token.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Servicio_medico';

  hasSession = false;
  lastState = TokenState.NOASSIGNED;
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.tokenObserver$.subscribe(state => {
      console.log('last state of token: ', this.lastState);

      console.log('tokn updated: ', state);

      if (state === TokenState.VALID && this.lastState === TokenState.VALID) return;

      else if (state === TokenState.EXPIRED) {
        console.log('el token actual expiro');
        //TODO: agregar mensaje visual al usuario cuando la sesion expira
      }
      this.lastState = state
      console.log('new state setted');

      this.router.navigate(['/main'])
      this.hasSession = true;
      console.log('navigated');

    });

    this.authService.verifyTokenPeriodically()
      .subscribe(isValid => {
        this.hasSession = isValid;

        if (!isValid) {
          this.router.navigate(['/']);
        }
      });


  }

  navigateMain() {
    this.router.navigate(['/main']);
  }
  navigateServices() {
    this.router.navigate(['/servicios']);
  }
  navigateConfer() {
    this.router.navigate(['/confer']);
  }
  navigateStudent() {
    this.router.navigate(['/alumnos']);
  }






}
