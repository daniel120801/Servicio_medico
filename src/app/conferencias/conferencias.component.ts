import { Component, OnInit, ViewChild } from '@angular/core';
import { Conferencia, IConferencia } from '../core/Models/conferencia.model';
import { Router } from '@angular/router';
import { ConferenciaServiceService } from '../core/services/conferencia.service';
import { FormConferModalComponent } from '../form-confer-modal/form-confer-modal.component';
import { NgIf } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { EstadisticasService } from '../core/services/estadisticas.service';

@Component({
  selector: 'app-conferencias',
  imports: [NgIf, QRCodeComponent],
  templateUrl: './conferencias.component.html',
  styleUrl: './conferencias.component.css',
  providers: [ConferenciaServiceService]
})
export class ConferenciasComponent implements OnInit {
  conferencias: Conferencia[] = [];
  asistentesConferencia: number = 0;
  matriculasAsistentes: string[] = [];
  mostrarMatriculas: boolean = false;
  qrData: string = '';
  url: SafeUrl = '';
  @ViewChild(FormConferModalComponent) modal!: FormConferModalComponent;
  conferenciaSeleccionada: Conferencia | null = null;

  constructor(
    private router: Router,
    public conferenciaService: ConferenciaServiceService,
    private estadisticasService: EstadisticasService
  ) { }

  ngOnInit(): void {
    this.cargarConferencias();
  }

  cargarConferencias(): void {
    this.conferenciaService.getConferencias().subscribe({
      next: (response: Conferencia[]) => {
        this.conferencias = response;
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
      conferencia.fecha,
      conferencia.hora,
      conferencia.presentador,
      conferencia.descripcion ?? ''
    );
    this.qrData = `https://localhost/Estadia/form-registro.php?conferencia_id=${conferencia.id}`;
    this.estadisticasService.getAsistentesPorConferencia(Number(conferencia.id)).subscribe(
      response => this.asistentesConferencia = response.total
    );
    this.mostrarMatriculas = false;
    this.matriculasAsistentes = [];
  }

  toggleMatriculas(): void {
    if (!this.conferenciaSeleccionada) return;
    
    if (!this.mostrarMatriculas) {
       this.estadisticasService.getMatriculasAsistentes(Number(this.conferenciaSeleccionada.id)).subscribe({
    next: (response: any) => {
        // PHP devuelve un array de objetos: [{ alumno_mtr: '12345' }, ...]
        this.matriculasAsistentes = response.asistentes.map((a: any) => a.alumno_mtr);
        this.mostrarMatriculas = true;
    },
    error: (error) => {
        console.error('Error al obtener matrículas:', error);
        this.matriculasAsistentes = [];
        this.mostrarMatriculas = true;
    }
});

    } else {
        this.mostrarMatriculas = false;
    }
}

  navigateToForm(): void {
    this.router.navigate(['/formConfer']);
  }

  onChangeURL($event: SafeUrl) {
    this.url = $event;
  }
}