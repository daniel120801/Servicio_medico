import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlumnosService } from '../../core/services/alumnos.service';
import { Alumno } from '../../core/Models/alumno.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seg-medico-alumno',
  imports: [CommonModule],
  templateUrl: './seg-medico-alumno.component.html',
  styleUrl: './seg-medico-alumno.component.css'
})
export class SegMedicoAlumnoComponent implements OnInit {

  @Output() toServicesEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() toFormEditEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() toPerfilEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() alumno: Alumno | null = null;
  constructor(private alumnosService: AlumnosService) {


  }
  ngOnInit(): void {
    if (!this.alumno) {
      this.volver();
    }
  }
  volver() {
    this.toPerfilEvent.emit();
  }
  toFormEdit() {
    this.toFormEditEvent.emit();
  }
  toServices() {
    this.toServicesEvent.emit();


  }

}
