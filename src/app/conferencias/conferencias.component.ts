import { Component, OnInit, ViewChild } from '@angular/core';
import { Conferencia } from '../core/Models/conferencia.model';
import { Router } from '@angular/router';
import { ConferenciaServiceService } from '../core/servicesComponent/conferencia.service';
import { FormConferModalComponent } from '../form-confer-modal/form-confer-modal.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-conferencias',
  imports: [],
  templateUrl: './conferencias.component.html',
  styleUrl: './conferencias.component.css',
  providers: [ConferenciaServiceService]
})
export class ConferenciasComponent implements OnInit {
  conferencias: Conferencia[] = [];

  @ViewChild(FormConferModalComponent) modal!: FormConferModalComponent;

  conferenciaSeleccionada: Conferencia = new Conferencia(
    '',
    '',
    '',
    '',
    '',
    ''
  );
  constructor(private router: Router, public conferenciaService: ConferenciaServiceService) { }

  ngOnInit(): void {
    if (this.conferenciaService == null) {
      console.log('Error: conferenciaService is null');
      return;
    }
    this.conferenciaService.getConferencias().subscribe(
      {
        next: (response: Conferencia[]) => {
          this.conferencias = response;
          console.log('Conferencias obtenidas:', this.conferencias);
        },
        error: (error) => {
          console.error('Error al obtener conferencias:', error);
          
          this.conferencias.push(new Conferencia(
            '1',
            'Error 1',
            'Fecha no asignada',
            'Hora no asignada',
            'Descripcion no asignada',
            'Presentador no asignado'
          ));

          this.conferencias.push(new Conferencia(
            '2',
            'Error 2',
            'Fecha no asignada',
            'Hora no asignada',
            'Descripcion no asignada',
            'Presentador no asignado'
          ));

        }
      }
    )
  }
  selectConferencia(conferencia: any): void {

    this.conferenciaSeleccionada = conferencia;
    console.log('Conferencia seleccionada:', this.conferenciaSeleccionada);
    
  }
  navigateToForm(): void {
    this.router.navigate(['/formConfer'])
  }
}
