import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlumnosComponent } from "../alumnos-buscador/alumnos-buscador.component";
import { CommonModule } from '@angular/common';
import { PerfilAlumnoComponent } from "../perfil-alumno/perfil-alumno.component";
import { ConferAsistidasAlumnoComponent } from "../confer-asistidas-alumno/confer-asistidas-alumno.component";
import { SegMedicoAlumnoComponent } from "../seg-medico-alumno/seg-medico-alumno.component";
import { provideSharedFeature } from '../../core/providers/alumnos.providers';
import { Subscription } from 'rxjs';
import { AlumnosService, ParentPages } from '../../core/services/alumnos.service';
import { Router } from '@angular/router';
import { Alumno, IAlumnoHeaders } from '../../core/Models/alumno.model';


@Component({
  selector: 'app-parent-alumnos',
  imports: [AlumnosComponent, PerfilAlumnoComponent, CommonModule, ConferAsistidasAlumnoComponent, SegMedicoAlumnoComponent],
  templateUrl: './parent-alumnos.component.html',
  styleUrl: './parent-alumnos.component.css',
  providers: [provideSharedFeature]

})
export class ParentAlumnosComponent implements OnInit, OnDestroy {

  selectedIdAlumno: string = '';
  alumnoSelected: Alumno | null = null;
  selectedPage: ParentPages = ParentPages.BUSCADOR;
  subscriptionRouteObserver: Subscription = new Subscription();
  subscriptionAlumnoObserver: Subscription = new Subscription();

  constructor(private alumnosService: AlumnosService, private router: Router) { }

  ngOnInit(): void {
    this.subscriptionRouteObserver = this.alumnosService.routesObserver$.subscribe(
      nuevoValor => {
        this.selectedPage = nuevoValor;
        
      }
    );
    this.subscriptionAlumnoObserver = this.alumnosService.alumnoSelectedObserver$.subscribe(
      {
        next: alumno => {
          if (!alumno) {
            console.error('No se recibió un alumno válido');
          } else {

            this.alumnoSelected = alumno;
            this.alumnosService.toPerfil();
          }
        },
        error: error => {
          console.error('Error al obtener el alumno seleccionado:', error);

        }
      }
    );
  } 
  onClosePerfil() {
    this.selectedIdAlumno = '';
    this.alumnosService.toSearch();
  }
  onAlumnoSelected(alumno: IAlumnoHeaders) {
    this.selectedIdAlumno = alumno.matricula;


    this.alumnosService.selectAlumno(this.selectedIdAlumno);
    //redirige desde el servicio de seleccion de alumnos
  }
  onConferAsistidas() {
    if (this.selectedIdAlumno == '') {
      console.error('No hay un alumno seleccionado para mostrar conferencias asistidas.');
      return;
    }
    this.alumnosService.toConferAsistidas();
  }
  onSegMedico() {
    if (this.selectedIdAlumno == '') {
      console.error('No hay un alumno seleccionado para mostrar el seguro médico.');
      return;
    }
    this.alumnosService.toSegMedico();
  }
  get ParentPages() {
    return ParentPages;
  }
  toGeneralConferences() {
    this.router.navigate(['/confer']);

  }
  toGeneralServices() {
    this.router.navigate(['/servicios']);
  }
  ngOnDestroy(): void {
    this.subscriptionRouteObserver.unsubscribe();
    this.subscriptionAlumnoObserver.unsubscribe();
  }
}
