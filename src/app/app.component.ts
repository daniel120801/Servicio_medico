import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Servicio_medico';

  constructor(private router: Router) { }


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
