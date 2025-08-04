import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlumnosService } from '../../core/services/alumnos.service';
import { Alumno } from '../../core/Models/alumno.model';
import { CommonModule } from '@angular/common';
import { filterConferenciasUtility as filterUtility } from '../../core/Utilities/filterConferenciasUtility';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Conferencia } from '../../core/Models/conferencia.model';

/**
 * Componente para mostrar las conferencias asistidas por un alumno.
 * 
 * @remarks
 * Este componente permite visualizar y filtrar la lista de conferencias a las que ha asistido un alumno específico.
 * Proporciona eventos para navegar entre la vista de conferencias y el perfil del alumno.
 * Utiliza un formulario reactivo para realizar búsquedas en la lista de conferencias.
 * 
 * @example
 * ```html
 * <app-confer-asistidas-alumno [alumno]="alumnoSeleccionado"
 *   (toConferencesEvent)="onToConferences()"
 *   (toPerfilEvent)="onToPerfil()">
 * </app-confer-asistidas-alumno>
 * ```
 * 
 * @property {EventEmitter<void>} toConferencesEvent - Evento emitido al solicitar la navegación a la lista de conferencias.
 * @property {EventEmitter<void>} toPerfilEvent - Evento emitido al solicitar la navegación al perfil del alumno.
 * @property {Alumno | null} alumno - Instancia del alumno cuyas conferencias asistidas se mostrarán.
 * @property {filterUtility} filter - Utilidad para filtrar conferencias según el término de búsqueda.
 * @property {FormGroup} searchForm - Formulario reactivo para la búsqueda de conferencias.
 * @property {Conferencia[] | null} filteredConferencias - Lista filtrada de conferencias asistidas por el alumno.
 * 
 * @method ngOnInit Inicializa el componente, configura la lista de conferencias y el filtro de búsqueda.
 * @method updateList Actualiza la lista de conferencias filtradas según el valor de búsqueda.
 * @method volver Emite el evento para regresar al perfil del alumno.
 * @method onConferenceSelected Método para manejar la selección de una conferencia (sin implementar).
 * @method toConferences Emite el evento para navegar a la lista de conferencias.
 * 
 * @dependencies
 * - CommonModule
 * - ReactiveFormsModule
 * - AlumnosService
 * - FormBuilder
 * - filterUtility
 */
@Component({
  selector: 'app-confer-asistidas-alumno',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confer-asistidas-alumno.component.html',
  styleUrl: './confer-asistidas-alumno.component.css'
})
export class ConferAsistidasAlumnoComponent implements OnInit {


  @Output() toConferencesEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() toPerfilEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() alumno: Alumno | null = null
  filter: filterUtility = new filterUtility();
  searchForm: FormGroup;
  filteredConferencias: Conferencia[] | null = [];
  constructor(private alumnosService: AlumnosService,
    private fb: FormBuilder

  ) {
    this.searchForm = this.fb.group({
      searchInput: ['']
    });
  }
  ngOnInit(): void {
    if (!this.alumno) {
      this.volver();
    }
    this.filteredConferencias = this.alumno === null ? [] : this.alumno.conferenciasAsistidas
    this.filter.setConferencias(this.filteredConferencias);

    this.searchForm.get('searchInput')?.valueChanges.subscribe(valor => {
      this.updateList(valor);
    });
  }
  updateList(valor: any) {
    this.filteredConferencias = this.filter.filterConferencias(valor)
  }

  volver() {
    this.toPerfilEvent.emit();
  }
  onConferenceSelected(conferencia: Conferencia) {
    
  }
  toConferences() {
    this.toConferencesEvent.emit();
    

  }

}
