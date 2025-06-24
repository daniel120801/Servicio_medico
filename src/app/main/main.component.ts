import { Component } from '@angular/core';
import { EstadisticasService } from '../core/services/estadisticas.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-main',
  imports: [NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})


export class MainComponent {
  consultasPorDia: number = 0;
  consultasPorFecha: { fecha: string, total: number }[] = [];
 

  constructor(private estadisticasService: EstadisticasService) {}

// ...existing code...
consultasHoy: any[] = [];

ngOnInit() {
  this.estadisticasService.getConsultas().subscribe(data => {
    const hoy = new Date().toISOString().slice(0, 10);
    this.consultasHoy = data.filter(item => item.fecha.slice(0, 10) === hoy);
  });
}
// ...existing code...
 

      
}



