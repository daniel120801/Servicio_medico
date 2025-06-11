import { Component, OnInit, ViewChild } from '@angular/core';
import { Conferencia, IConferencia } from '../core/Models/conferencia.model';
import { Router } from '@angular/router';
import { ConferenciaServiceService } from '../core/services/conferencia.service';
import { FormConferModalComponent } from '../form-confer-modal/form-confer-modal.component';
import { NgIf } from '@angular/common';
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

  constructor(
    private router: Router,
    public conferenciaService: ConferenciaServiceService
  ) { }

  ngOnInit(): void {
    this.cargarConferencias();
  }

  cargarConferencias(): void {
    this.conferenciaService.getConferencias().subscribe({
      next: (response: Conferencia[]) => {
        this.conferencias = response;
        console.log('Conferencias obtenidas:', this.conferencias);
      },
      error: (error) => {
        console.error('Error al obtener conferencias:', error);
        this.conferencias = [];
      }
    });
  }

selectConferencia(conferencia: IConferencia) {
  this.conferenciaSeleccionada = new Conferencia(
    conferencia.id,
    conferencia.nombre,
    conferencia.descripcion ?? '',
    conferencia.fecha,
    conferencia.presentador
  );
  // Cambia la URL según tu entorno/localhost o dominio real
  this.qrData = `http://localhost/Estadia/form-registro.html?conferencia_id=${conferencia.id}`;

  
    console.log('Datos del QR:', this.qrData);
    console.log('Conferencia seleccionada:', this.conferenciaSeleccionada);
  // Si usas otro host, reemplaza la URL base
}
  navigateToForm(): void {
    this.router.navigate(['/formConfer']);
  }

  onChangeURL($event: SafeUrl) {
    this.url = $event;
  }
}