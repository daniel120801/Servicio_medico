import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { EventType, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AuthService, TokenState } from './core/services/token.service';
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
  maxTiempo = 15 * (1000 * 60);
  delayInterval = 1 * (1000 * 60);
  tiempoActual = 0;
  constructor(private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.authService.tokenStateObserver$.subscribe(state => {
      if (state === TokenState.VALID && this.lastState === TokenState.VALID) return;

      if (state === TokenState.EXPIRED) {
        this.stopTimer();
        // TODO: agregar mensaje visual al usuario cuando la sesion expira
      }

      this.lastState = state;
      this.hasSession = state === TokenState.VALID;
      if (this.hasSession) {
        this.router.navigate(['/main']);
        this.startTimer();
      }
    });


    this.router.events.subscribe((event) => {


     // console.log(event);
      if (event.type === EventType.NavigationStart)
        if (!this.hasSession && event.url !== '/') {
          this.router.navigate(['/']);
        }
    })

  }


  startTimer() {
    this.tiempoActual = this.maxTiempo;
    this.temporizador = interval(this.delayInterval).subscribe(() => {
      this.tiempoActual -= this.delayInterval;
      console.log(this.tiempoActual);

      if (this.tiempoActual <= 0) {

        this.authService.logout()


        this.hasSession = false;
        this.router.navigate(['/']);

      }
    });
  }
  stopTimer(){

    this.temporizador.unsubscribe();
  }
  @HostListener('document:mousemove', ['$event'])
  onGlobalMouseMove(event: MouseEvent) {
   // console.log('temporizador reiniciado por mouse');
    this.tiempoActual = this.maxTiempo;
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
   // console.log('temporizador reiniciado por teclado');
    this.tiempoActual = this.maxTiempo;
  }
  navigate(path: string) {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
