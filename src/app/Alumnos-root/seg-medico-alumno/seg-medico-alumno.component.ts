import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlumnosService } from '../../core/services/alumnos.service';
import { Alumno } from '../../core/Models/alumno.model';
import { CommonModule } from '@angular/common';

/**
 * Componente que representa la vista de seguimiento médico de un alumno.
 * 
 * @remarks
 * Este componente permite mostrar información relevante sobre el alumno y 
 * gestionar la navegación entre diferentes vistas relacionadas, como el perfil,
 * la edición de formularios y los servicios médicos disponibles.
 * 
 * @example
 * ```html
 * <app-seg-medico-alumno
 *   [alumno]="alumnoSeleccionado"
 *   (toPerfilEvent)="mostrarPerfil()"
 *   (toFormEditEvent)="editarFormulario()"
 *   (toServicesEvent)="verServicios()">
 * </app-seg-medico-alumno>
 * ```
 * 
 * @property {EventEmitter<void>} toServicesEvent - Evento emitido para navegar a la vista de servicios médicos.
 * @property {EventEmitter<void>} toFormEditEvent - Evento emitido para navegar a la edición del formulario médico.
 * @property {EventEmitter<void>} toPerfilEvent - Evento emitido para regresar a la vista de perfil del alumno.
 * @property {Alumno | null} alumno - Datos del alumno que se muestran en el componente. Si es nulo, se regresa automáticamente al perfil.
 * 
 * @method ngOnInit - Inicializa el componente y verifica si el alumno está definido; si no, regresa al perfil.
 * @method volver - Emite el evento para regresar al perfil del alumno.
 * @method toFormEdit - Emite el evento para navegar a la edición del formulario médico.
 * @method toServices - Emite el evento para navegar a la vista de servicios médicos.
 * 
 * @param alumnosService - Servicio para gestionar operaciones relacionadas con alumnos.
 */
@Component({
  selector: 'app-seg-medico-alumno',
  imports: [CommonModule],
  templateUrl: './seg-medico-alumno.component.html',
  styleUrl: './seg-medico-alumno.component.css'
})
export class SegMedicoAlumnoComponent implements OnInit {

  @Output() toServicesEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() toFormEditEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() toPerfilEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() alumno: Alumno | null = null;
  constructor(private alumnosService: AlumnosService) {


  }
  ngOnInit(): void {
    if (!this.alumno) {
      this.volver();
    }
  }
  volver() {
    this.toPerfilEvent.emit();
  }
  toFormEdit() {
    this.toFormEditEvent.emit();
  }
  toServices() {
    this.toServicesEvent.emit();


  }

}
