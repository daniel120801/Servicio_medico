import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { EventType, Router, RouterOutlet } from '@angular/router';
import { AuthService, TokenState } from './core/services/token.service';
import { NgIf } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../styles.css'],
  standalone: true,
  imports: [RouterOutlet, NgIf]

})
export class AppComponent implements OnInit, OnDestroy {


  title = 'Servicio_medico';
  hasSession = false;
  private lastState = TokenState.NOASSIGNED;

  sessionExpired: boolean = false;
  temporizador!: Subscription;
  maxTiempo = 1 * (1000 * 60);
  delayInterval = 1 * (1000 * 60);
  tiempoActual = 0;
  constructor(private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.authService.tokenStateObserver$.subscribe(state => {
      if (state === TokenState.VALID && this.lastState === TokenState.VALID) return;

      switch (state) {
        case TokenState.EXPIRED:
          // TODO: agregar mensaje visual al usuario cuando la sesion expira
          this.sessionExpired = true;
          console.log('token expirado');

          break;
        case TokenState.NOASSIGNED:
          if (this.lastState != state)
            this.handleLogout();
          break;
        case TokenState.VALID:
          this.hasSession = true;
          this.router.navigate(['/main']);
          this.startTimer();
          break;
      }
      this.lastState = state;
    });



    this.router.events.subscribe((event) => {


      // console.log(event);
      if (event.type === EventType.NavigationStart)
        if (!this.hasSession && event.url !== '/') {
          this.router.navigate(['/']);
        }
    })

  }
  onAcceptSessionExpired() {
    this.handleLogout()
    this.sessionExpired = false;
  }
  handleLogout() {
    this.stopTimer();
    this.hasSession = false;
    this.router.navigate(['/']);
  }
  startTimer() {
    this.tiempoActual = this.maxTiempo;
    this.temporizador = interval(this.delayInterval).subscribe(() => {
      this.tiempoActual -= this.delayInterval;
      console.log(this.tiempoActual);

      if (this.tiempoActual <= 0)
        this.authService.logout()
    });
  }
  stopTimer() {

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
