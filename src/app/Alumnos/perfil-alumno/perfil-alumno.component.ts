import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alumno } from '../models/alumno.model';
import { AlumnosService } from '../services/alumnos.service';
import { alumnoTest1 } from '../../Tests/Alumno-tests';
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
