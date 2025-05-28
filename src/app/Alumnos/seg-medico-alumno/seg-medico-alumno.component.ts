import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';
import { Alumno } from '../models/alumno.model';
import { alumnoTest1 } from '../../Tests/Alumno-tests';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seg-medico-alumno',
  imports: [CommonModule],
  templateUrl: './seg-medico-alumno.component.html',
  styleUrl: './seg-medico-alumno.component.css'
})
export class SegMedicoAlumnoComponent {
  @Output() toServicesEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() alumnoId: number = -1;
  alumno: Alumno | null = null;
  constructor(private alumnosService: AlumnosService) {
    console.log('AlumnoId en SegMedicoAlumnoComponent:', this.alumnoId);

    this.alumnosService.alumnoSelectedObserver$.subscribe(
      {
        next: (response: Alumno | null) => {
          this.alumno = <Alumno>response;

          console.log('Alumno en perfil:', this.alumno);
        }
        , error: (error: any) => {
          console.error('Error al obtener alumno:', error);
          this.alumno = alumnoTest1;
          console.log('Alumno en perfil:', this.alumno);

        }

      });
  }


volver() {
  this.alumnosService.toPerfil();
}

toServices() {
  this.toServicesEvent.emit();

  console.log('Evento de volver a conferencias emitido desde ConferAsistidasAlumnoComponent');
}

}
