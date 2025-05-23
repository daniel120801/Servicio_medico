import { Component } from '@angular/core';
import { AlumnosComponent } from "../alumnos-buscador/alumnos-buscador.component";
import { CommonModule } from '@angular/common';
import { PerfilAlumnoComponent } from "../perfil-alumno/perfil-alumno.component";
import { AlumnoHeaders } from '../../core/Models/alumnoHeaders.model';
import { ConferAsistidasAlumnoComponent } from "../confer-asistidas-alumno/confer-asistidas-alumno.component";
import { SegMedicoAlumnoComponent } from "../seg-medico-alumno/seg-medico-alumno.component";
import { provideSharedFeature } from '../alumnos.providers';

@Component({
  selector: 'app-parent-alumnos',
  imports: [AlumnosComponent, PerfilAlumnoComponent, CommonModule, ConferAsistidasAlumnoComponent, SegMedicoAlumnoComponent],
  templateUrl: './parent-alumnos.component.html',
  styleUrl: './parent-alumnos.component.css',
  providers: [provideSharedFeature]

})
export class ParentAlumnosComponent {
  selectedIdAlumno: number  = -1;

  selectedPage: ParentPages = ParentPages.ALUMNOS;
  constructor() {
  }

  onClosePerfil() {
    this.selectedIdAlumno = -1;
    this.selectedPage = ParentPages.ALUMNOS;
    console.log('Evento de cerrar perfil recibido');
    console.log('selectedAlumno después de cerrar perfil:', this.selectedIdAlumno);
  }

  onAlumnoSelected(alumno: AlumnoHeaders) {
    this.selectedIdAlumno = alumno.id;
    this.selectedPage = ParentPages.PERFIL;
    console.log('Alumno seleccionado en Parent:', this.selectedIdAlumno);
  }
  onConferAsistidas() {
    if (this.selectedIdAlumno == -1) {
      console.error('No hay un alumno seleccionado para mostrar conferencias asistidas.');
      return;
    }
    this.selectedPage = ParentPages.CONFER_ASISTIDAS;
    console.log('Evento de conferencias asistidas recibido');
  }
  onSegMedico() {
       if (this.selectedIdAlumno == -1) {
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