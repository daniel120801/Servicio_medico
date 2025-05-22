import { Component } from '@angular/core';
import { AlumnosComponent } from "../alumnos/alumnos.component";
import { CommonModule } from '@angular/common';
import { PerfilAlumnoComponent } from "../perfil-alumno/perfil-alumno.component";
import { AlumnoHeaders } from '../core/Models/alumnoHeaders.model';
import { AlumnosService } from '../core/servicesComponent/alumnos.service';
import { ConferAsistidasAlumnoComponent } from "../confer-asistidas-alumno/confer-asistidas-alumno.component";
import { SegMedicoAlumnoComponent } from "../seg-medico-alumno/seg-medico-alumno.component";

@Component({
  selector: 'app-parent-alumnos',
  imports: [AlumnosComponent, PerfilAlumnoComponent, CommonModule, ConferAsistidasAlumnoComponent, SegMedicoAlumnoComponent],
  templateUrl: './parent-alumnos.component.html',
  styleUrl: './parent-alumnos.component.css',
  providers: [AlumnosService]

})

export class ParentAlumnosComponent {
  selectedAlumno: AlumnoHeaders | null = null;
  selectedPage: ParentPages = ParentPages.ALUMNOS;
  constructor(private alumnosService: AlumnosService) {
    this.selectedAlumno = null;
  }

  onClosePerfil() {
    this.selectedAlumno = null;
    this.selectedPage = ParentPages.ALUMNOS;
    console.log('Evento de cerrar perfil recibido');
    console.log('selectedAlumno después de cerrar perfil:', this.selectedAlumno);
  }

  onAlumnoSelected(alumno: AlumnoHeaders) {
    this.selectedAlumno = alumno;
    this.selectedPage = ParentPages.PERFIL;
    console.log('Alumno seleccionado en Parent:', this.selectedAlumno);
  }
  onConferAsistidas() {
    if (!this.selectedAlumno) {
      console.error('No hay un alumno seleccionado para mostrar conferencias asistidas.');
      return;
    }
    this.selectedPage = ParentPages.CONFER_ASISTIDAS;
    console.log('Evento de conferencias asistidas recibido');
  }
  onSegMedico() {
    if (!this.selectedAlumno) {
      console.error('No hay un alumno seleccionado para mostrar el seguro médico.');
      return;
    }
    this.selectedPage = ParentPages.SEG_MEDICO;
    console.log('Evento de seguro médico recibido');
  }
  get ParentPages() {
    return ParentPages;
  }
  
}
enum ParentPages {
  ALUMNOS = 'alumnos',
  PERFIL = 'perfil',
  CONFER_ASISTIDAS = 'confer_asistidas',
  SEG_MEDICO = 'seg_medico'
}