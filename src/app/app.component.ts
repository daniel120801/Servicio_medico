import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { EventType, Router, RouterOutlet } from '@angular/router';
import { AuthService, TokenState } from './core/services/token.service';
import { NgIf } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { Timer } from './core/Utilities/Timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../styles.css'],
  standalone: true,
  imports: [RouterOutlet, NgIf]

})
export class AppComponent implements OnInit, OnDestroy {


  title = 'Servicio_medico';
  hasSession = false;
  private lastState = TokenState.NOASSIGNED;

  sessionExpired: boolean = false;
  timer: Timer;
  constructor(private router: Router, private authService: AuthService) {
    this.timer = new Timer(15, 1);
    this.timer.setOnEndListener(() => {
      this.authService.logout()
    })
  }


  ngOnInit(): void {
    this.authService.tokenStateObserver$.subscribe(state => {
      if (state === TokenState.VALID && this.lastState === TokenState.VALID) return;

      switch (state) {
        case TokenState.EXPIRED:
         
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
          this.timer.startTimer();
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
    this.timer.stopTimer();
    this.hasSession = false;
    this.router.navigate(['/']);
  }


  @HostListener('document:mousemove', ['$event'])
  onGlobalMouseMove(event: MouseEvent) {
    // console.log('temporizador reiniciado por mouse');
    this.timer.restart();
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // console.log('temporizador reiniciado por teclado');
    this.timer.restart();
  }
  navigate(path: string) {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.timer.stopTimer();
  }
}
