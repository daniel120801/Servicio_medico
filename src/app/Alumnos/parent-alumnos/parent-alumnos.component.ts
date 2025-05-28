import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlumnosComponent } from "../alumnos-buscador/alumnos-buscador.component";
import { CommonModule } from '@angular/common';
import { PerfilAlumnoComponent } from "../perfil-alumno/perfil-alumno.component";
import { ConferAsistidasAlumnoComponent } from "../confer-asistidas-alumno/confer-asistidas-alumno.component";
import { SegMedicoAlumnoComponent } from "../seg-medico-alumno/seg-medico-alumno.component";
import { provideSharedFeature } from '../providers/alumnos.providers';
import { Subscription } from 'rxjs';
import { AlumnosService, ParentPages } from '../services/alumnos.service';
import { Router } from '@angular/router';
import { IAlumnoHeaders } from '../models/alumno.model';

@Component({
  selector: 'app-parent-alumnos',
  imports: [AlumnosComponent, PerfilAlumnoComponent, CommonModule, ConferAsistidasAlumnoComponent, SegMedicoAlumnoComponent],
  templateUrl: './parent-alumnos.component.html',
  styleUrl: './parent-alumnos.component.css',
  providers: [provideSharedFeature]

})
export class ParentAlumnosComponent implements OnInit, OnDestroy {


  selectedIdAlumno: number = -1;
  selectedPage: ParentPages = ParentPages.BUSCADOR;
  subscription: Subscription = new Subscription();

  constructor(private alumnosService: AlumnosService, private router: Router) { }
  ngOnInit(): void {
    this.subscription = this.alumnosService.routesObserver$.subscribe(
      nuevoValor => {
        this.selectedPage = nuevoValor;
        console.log('Nuevo valor recibido:', nuevoValor);
      }
    );
  }
  onClosePerfil() {
    this.selectedIdAlumno = -1;
    this.selectedPage = ParentPages.BUSCADOR;
    console.log('Evento de cerrar perfil recibido');
    console.log('selectedAlumno después de cerrar perfil:', this.selectedIdAlumno);
  }
  onAlumnoSelected(alumno: IAlumnoHeaders) {
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
  toGeneralConferences() {
    this.router.navigate(['/confer']);
    console.log('Redirigiendo a conferencias generales');

  }

  toGeneralServices() {
     this.router.navigate(['/servicios']);
    console.log('Redirigiendo a servicios generales');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
