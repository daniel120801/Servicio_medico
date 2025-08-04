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
import { FormModifyStatsMedicalComponent } from "../v2-form-modify-stats-medical/form-modify-stats-medical.component";


/**
 * Componente principal para la gestión de alumnos en el módulo de servicio médico.
 * 
 * Este componente actúa como contenedor y orquestador de las vistas relacionadas con los alumnos,
 * permitiendo navegar entre diferentes páginas (buscador, perfil, conferencias asistidas, seguro médico, etc.)
 * y gestionar la selección y modificación de alumnos.
 * 
 * @remarks
 * - Utiliza observables para reaccionar a cambios en la ruta y en la selección de alumnos.
 * - Proporciona métodos para navegar entre las diferentes vistas internas y para modificar datos del alumno seleccionado.
 * - Gestiona la suscripción y desuscripción de observadores para evitar fugas de memoria.
 * 
 * @example
 * ```html
 * <app-parent-alumnos></app-parent-alumnos>
 * ```
 * 
 * @property {string} selectedIdAlumno - Matrícula del alumno actualmente seleccionado.
 * @property {Alumno | null} alumnoSelected - Instancia del alumno seleccionado, o null si no hay ninguno.
 * @property {ParentPages} selectedPage - Página actual mostrada en el componente.
 * @property {Subscription} subscriptionRouteObserver - Suscripción al observable de rutas.
 * @property {Subscription} subscriptionAlumnoObserver - Suscripción al observable de selección de alumno.
 * 
 * @method ngOnInit - Inicializa las suscripciones a los observables de rutas y selección de alumno.
 * @method ngOnDestroy - Cancela las suscripciones para evitar fugas de memoria.
 * @method onPerfil - Navega a la vista de perfil del alumno.
 * @method onClosePerfil - Cierra la vista de perfil y regresa al buscador.
 * @method onAlumnoSelected - Selecciona un alumno y actualiza el estado interno.
 * @method toFormEditSegMed - Navega al formulario de edición de seguro médico del alumno.
 * @method onConferAsistidas - Navega a la vista de conferencias asistidas del alumno.
 * @method onSegMedico - Navega a la vista de seguro médico del alumno.
 * @method modifyAlumno - Modifica los datos del alumno seleccionado según los valores recibidos.
 * @method toGeneralConferences - Redirige a la vista general de conferencias.
 * @method toGeneralServices - Redirige a la vista general de servicios.
 * 
 * @see AlumnosService
 * @see ParentPages
 */
@Component({
  selector: 'app-parent-alumnos',
  imports: [AlumnosComponent, PerfilAlumnoComponent, CommonModule, ConferAsistidasAlumnoComponent, SegMedicoAlumnoComponent, FormModifyStatsMedicalComponent],
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
            this.selectedPage = ParentPages.PERFIL;
          }
        },
        error: error => {
          console.error('Error al obtener el alumno seleccionado:', error);

        }
      }
    );
  }

  onPerfil() {
    this.selectedPage = ParentPages.PERFIL;
  }
  onClosePerfil() {
    this.selectedIdAlumno = '';
    this.selectedPage = ParentPages.BUSCADOR;
  }
  onAlumnoSelected(alumno: IAlumnoHeaders) {
    this.selectedIdAlumno = alumno.matricula;


    this.alumnosService.selectAlumno(this.selectedIdAlumno);
    //redirige desde el servicio de seleccion de alumnos
  }
  toFormEditSegMed() {
    if (this.selectedIdAlumno == '') {
      console.error('No hay un alumno seleccionado para mostrar conferencias asistidas.');
      return;
    }
    this.selectedPage = ParentPages.FORM_SEG_MED;
  }
  onConferAsistidas() {
    if (this.selectedIdAlumno == '') {
      console.error('No hay un alumno seleccionado para mostrar conferencias asistidas.');
      return;
    }
    this.selectedPage = ParentPages.CONFER_ASISTIDAS;
  }
  onSegMedico() {
    if (this.selectedIdAlumno == '') {
      console.error('No hay un alumno seleccionado para mostrar el seguro médico.');
      return;
    }
    this.selectedPage = ParentPages.SEG_MEDICO
  }
  modifyAlumno($event: { key: string, value: any }[]) {

    $event.forEach( value =>{
      (this.alumnoSelected as any)[value.key] = value.value;
    })
    console.log('nuevo alumno: ', this.alumnoSelected);
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
