import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from '../core/Models/alumno.model';
import { AlumnosService } from '../core/servicesComponent/alumnos.service';

@Component({
  selector: 'app-perfil-alumno',
  imports: [],
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css'],
  providers: [AlumnosService]
})
export class PerfilAlumnoComponent implements OnInit {
  @Output() volverEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() openSegMedicoEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() openConferAsisEvent: EventEmitter<void> = new EventEmitter<void>();
  alumno: Alumno | null = null;
  constructor(private router: Router, private alumnosService: AlumnosService) {
    console.log('ID recibido:', this.router.getCurrentNavigation()?.extras.state?.['id']);
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
