import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnosService } from '../../core/services/alumnos.service';
import { IAlumnoHeaders } from '../../core/Models/alumno.model';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Searcher, FilterMode } from '../../core/Utilities/Searcher';

/**
 * Componente para buscar y seleccionar alumnos.
 * 
 * Permite filtrar alumnos por diferentes criterios, realizar búsquedas con debounce,
 * manejar paginación y emitir eventos al seleccionar un alumno.
 * 
 * @example
 * <app-alumnos (onSelectAlumnoEvent)="handleSelect($event)"></app-alumnos>
 * 
 * @property {EventEmitter<IAlumnoHeaders>} onSelectAlumnoEvent - Evento emitido al seleccionar un alumno.
 * @property {FormGroup} searchForm - Formulario reactivo para búsqueda y filtro.
 * @property {IAlumnoHeaders[]} filteredAlumnos - Lista de alumnos filtrados.
 * @property {boolean} searching - Indica si se está realizando una búsqueda.
 * @property {boolean} hasErrorSearch - Indica si ocurrió un error en la búsqueda.
 * 
 * @method ngOnInit Inicializa el formulario y suscripciones.
 * @method ngOnDestroy Limpia las suscripciones al destruir el componente.
 * @method onSelectAlumno Emite el evento al seleccionar un alumno.
 * @method onNextPag Avanza a la siguiente página de resultados.
 * @method onPrevPag Retrocede a la página anterior de resultados.
 * @method hasMorePages Indica si hay más páginas disponibles.
 * @method getPage Obtiene el número de página actual.
 */
/**
 * Componente para la búsqueda y selección de alumnos.
 * 
 * Permite filtrar alumnos por diferentes criterios, realizar búsquedas con debounce,
 * manejar paginación y emitir eventos al seleccionar un alumno.
 * 
 * @remarks
 * - Utiliza Reactive Forms para gestionar el formulario de búsqueda.
 * - Se conecta con el servicio `AlumnosService` para obtener y filtrar los datos.
 * - Implementa lógica para manejar errores en la búsqueda y mostrar el estado de carga.
 * - Soporta paginación y actualización de la lista de resultados.
 * 
 * @example
 * ```html
 * <app-alumnos (onSelectAlumnoEvent)="handleAlumno($event)"></app-alumnos>
 * ```
 * 
 * @fires onSelectAlumnoEvent - Se emite cuando un alumno es seleccionado.
 * 
 * @property {FormGroup} searchForm - Formulario reactivo para la búsqueda de alumnos.
 * @property {IAlumnoHeaders[]} filteredAlumnos - Lista filtrada de alumnos según los criterios de búsqueda.
 * @property {boolean} searching - Indica si se está realizando una búsqueda actualmente.
 * @property {boolean} hasErrorSearch - Indica si ocurrió un error en la búsqueda.
 * 
 * @method ngOnInit - Inicializa el formulario y las suscripciones necesarias.
 * @method ngOnDestroy - Limpia las suscripciones al destruir el componente.
 * @method updateList - Actualiza la lista de alumnos, opcionalmente forzando la actualización.
 * @method search - Realiza una búsqueda de alumnos según el valor ingresado.
 * @method onNextPag - Avanza a la siguiente página de resultados.
 * @method onPrevPag - Retrocede a la página anterior de resultados.
 * @method hasMorePages - Indica si hay más páginas disponibles en los resultados.
 * @method getPage - Obtiene el número de página actual.
 * @method onSelectAlumno - Emite el evento de selección de alumno.
 */
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos-buscador.component.html',
  styleUrls: ['./alumnos-buscador.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AlumnosComponent implements OnInit, OnDestroy {
  @Output() onSelectAlumnoEvent = new EventEmitter<IAlumnoHeaders>();
  searchForm!: FormGroup;
  filteredAlumnos: IAlumnoHeaders[] = [];
  private requestSearch?: Subscription;
  private searcher: Searcher;
  searching = true;
  hasErrorSearch = false;

  constructor(
    private fb: FormBuilder,
    alumnosService: AlumnosService
  ) {
    this.searcher = alumnosService.getSearcher();
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToSearcher();
    this.subscribeToFormChanges();
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      filterSearch: ['nombre', Validators.required],
      searchInput: ['', Validators.required]
    });
  }

  private subscribeToSearcher(): void {
    this.requestSearch = this.searcher.search().subscribe(val => this.handleSearchResult(val));
    this.searcher.setFilter(FilterMode.NOMBRE);
  }

  private subscribeToFormChanges(): void {
    this.searchForm.get('filterSearch')?.valueChanges.subscribe(valor => {
      const newFilterMode = FilterMode[String(valor).toUpperCase() as keyof typeof FilterMode];
      this.searcher.setFilter(newFilterMode);
      this.updateList(true);
    });

    this.searchForm.get('searchInput')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(valor => this.search(valor));
  }

  private handleSearchResult(val: any): void {
    if (Array.isArray(val)) {
      this.filteredAlumnos = val;
      this.hasErrorSearch = false;
    } else if (val && typeof val === 'object' && 'error' in val) {
      this.filteredAlumnos = [];
      this.onFailSearch();
    }
    this.searching = false;
  }

  onFailSearch(): void {
    this.hasErrorSearch = true;
  }

  updateList(force = false): void {
    this.searching = true;
    this.requestSearch?.unsubscribe();
    this.requestSearch = this.searcher.update(force).subscribe(val => this.handleSearchResult(val));
  }

  search(value: string): void {
    this.searching = true;
    this.requestSearch?.unsubscribe();
    this.requestSearch = this.searcher.search(value).subscribe({
      next: val => this.handleSearchResult(val),
      error: () => { this.searching = false; }
    });
  }

  onNextPag(): void {
    this.searcher.nextPage();
    this.updateList(true);
  }

  onPrevPag(): void {
    this.searcher.prevPage();
    this.updateList(true);
  }

  hasMorePages(): boolean {
    return this.filteredAlumnos.length > 0 && this.filteredAlumnos.length % 10 === 0;
  }

  getPage(): number {
    return this.searcher.getPage();
  }

  onSelectAlumno(alumno: IAlumnoHeaders): void {
    this.onSelectAlumnoEvent.emit(alumno);
  }

  ngOnDestroy(): void {
    this.requestSearch?.unsubscribe();
  }
}
