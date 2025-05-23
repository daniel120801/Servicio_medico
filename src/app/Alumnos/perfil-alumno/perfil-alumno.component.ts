import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alumno } from '../../core/Models/alumno.model';
import { AlumnosService } from '../alumnos.service';
import { alumnoTest1 } from '../../Tests/Alumno-tests';

@Component({
  selector: 'app-perfil-alumno',
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
    this.generals = new this.alumnosService.generals(this.alumnosService);

    this.generals.getAlumno(this.alumnoId).subscribe(
      {
        next: (response: Alumno) => {
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

  ngOnInit(): void {
  }
  onOpenSegMedico() {
    this.openSegMedicoEvent.emit();
  }
  onOpenConferAsistidas() {
    this.openConferAsisEvent.emit();
  }
  volver() {
    this.volverEvent.emit();
  }
}
