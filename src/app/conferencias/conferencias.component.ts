import { Component, OnInit, ViewChild } from '@angular/core';
import { Conferencia } from '../core/Models/conferencia.model';
import { Router } from '@angular/router';
import { ConferenciaServiceService } from '../core/services/conferencia.service';
import { FormConferModalComponent } from '../form-confer-modal/form-confer-modal.component';
import {  NgIf } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-conferencias',
  imports: [NgIf, QRCodeComponent],
  templateUrl: './conferencias.component.html',
  styleUrl: './conferencias.component.css',
  providers: [ConferenciaServiceService]
})

export class ConferenciasComponent implements OnInit {

 
  conferencias: Conferencia[] = [];
  qrData: string = '';
  url: SafeUrl = '';

  @ViewChild(FormConferModalComponent) modal!: FormConferModalComponent;

  conferenciaSeleccionada: Conferencia | null = null;
  constructor(private router: Router, public conferenciaService: ConferenciaServiceService) { }


  ngOnInit(): void {
    if (this.conferenciaService == null) {
      
      return;
    }
    this.conferenciaService.getConferencias().subscribe(
      {
        next: (response: Conferencia[]) => {
          this.conferencias = response;
          
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
    // Cambia la URL del QR según la conferencia seleccionada (URL absoluta recomendada)
    this.qrData = `${window.location.origin}/form-registro?conferenciaId=${conferencia.id}`;
    

    
  }

  navigateToForm(): void {
    this.router.navigate(['/formConfer'])
  }

  onChangeURL($event: SafeUrl) {
    this.url = $event;
    
  }

}
