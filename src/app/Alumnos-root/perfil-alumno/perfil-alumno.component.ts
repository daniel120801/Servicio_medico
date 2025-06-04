import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alumno } from '../../core/Models/alumno.model';
import { AlumnosService } from '../../core/services/alumnos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-alumno',
  imports: [CommonModule],
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {
  @Output() volverEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() openSegMedicoEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() openConferAsisEvent: EventEmitter<void> = new EventEmitter<void>();

  @Input() alumno: Alumno | null = null;
  generals: any = null;

  constructor(private alumnosService: AlumnosService) {
    
  }

  ngOnInit(): void {
    if (!this.alumno) {
      console.log('No se ha recibido un alumno válido, usando alumno de prueba.');
      
      this.volver();
    }
  }
  onOpenSegMedico() {
    this.openSegMedicoEvent.emit();
  }
  onOpenConferAsistidas() {
    this.openConferAsisEvent.emit();
  }
  volver() {
    this.alumnosService.toSearch();
  }
}
