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

  @Input() alumnoId: number = -1;

  generals: any = null;

  alumno: Alumno | null = null;
  constructor(private alumnosService: AlumnosService) {
    this.alumnosService.alumnoSelectedObserver$.subscribe(
      {
        next: (response: Alumno|null) => {
          this.alumno = <Alumno>response;

          console.log('Alumno en perfil:', this.alumno);
        }
        , error: (error: any) => {
          console.error('Error al obtener alumno:', error);
          this.alumno = alumnoTest1;
          console.log(this.alumno.getHeader());
          console.log('Alumno en perfil:', this.alumno);

        }
      }
    );
    this.alumnosService.cambiarId(this.alumnoId);

  }

  ngOnInit(): void {
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
