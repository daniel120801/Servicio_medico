import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService, TokenState } from './token.service';
import { NgIf } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet, NgIf]

})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Servicio_medico';
  hasSession = false;
  private lastState = TokenState.NOASSIGNED;


  temporizador!: Subscription; // timer
  maxTiempo = 5 * (1000 * 60);
  delayInterval = 1 * (1000 * 60);
  tiempoActual = 0;
  constructor(private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.authService.tokenStateObserver$.subscribe(state => {
      if (state === TokenState.VALID && this.lastState === TokenState.VALID) return;

      if (state === TokenState.EXPIRED) {
        // TODO: agregar mensaje visual al usuario cuando la sesion expira
      }

      this.lastState = state;
      this.hasSession = state === TokenState.VALID;
      if (this.hasSession) {
        this.router.navigate(['/main']);
        this.startTimer();
      }
    });
    
  }


  startTimer() {
    this.tiempoActual = this.maxTiempo;
    this.temporizador = interval(this.delayInterval).subscribe(() => {
      this.tiempoActual -= this.delayInterval;
      console.log(this.tiempoActual);

      if (this.tiempoActual <= 0) {
        this.hasSession = false;
        this.router.navigate(['/']);

      }
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onGlobalMouseMove(event: MouseEvent) {
    console.log('temporizador reiniciado por mouse');
    this.tiempoActual = this.maxTiempo;
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('temporizador reiniciado por teclado');
    this.tiempoActual = this.maxTiempo;
  }
  navigate(path: string) {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.temporizador.unsubscribe();
  }
}
