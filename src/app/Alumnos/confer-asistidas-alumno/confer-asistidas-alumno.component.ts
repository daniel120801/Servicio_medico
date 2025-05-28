import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';

@Component({
  selector: 'app-confer-asistidas-alumno',
  imports: [],
  templateUrl: './confer-asistidas-alumno.component.html',
  styleUrl: './confer-asistidas-alumno.component.css'
})
export class ConferAsistidasAlumnoComponent {

  @Output() toConferencesEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input()  alumnoId: number = -1; // ID del alumno, se puede obtener de la ruta o de un servicio

  constructor(private alumnosService: AlumnosService) {
 
  }



  volver() {
    this.alumnosService.toPerfil();
  }

  toConferences() {
    this.toConferencesEvent.emit();
    console.log('Evento de volver a conferencias emitido desde ConferAsistidasAlumnoComponent');

  }

}
