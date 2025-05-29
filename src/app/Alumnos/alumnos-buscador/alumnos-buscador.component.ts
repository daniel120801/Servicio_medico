import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AlumnosService, FilterMode } from '../services/alumnos.service';
import { IAlumnoHeaders } from '../models/alumno.model';
import { filterHeadersUtility } from '../Utilities/filterHeadersUtility';


@Component({
  selector: 'app-alumnos',
  imports: [ReactiveFormsModule],
  templateUrl: './alumnos-buscador.component.html',
  styleUrls: ['./alumnos-buscador.component.css']
})
export class AlumnosComponent implements OnInit, OnDestroy {
  @Output() onSelectAlumnoEvent: EventEmitter<IAlumnoHeaders> = new EventEmitter<IAlumnoHeaders>();
  searchForm: FormGroup;
  opcionSeleccionada: any;
  filteredAlumnos: IAlumnoHeaders[] = [];
  filterMode: FilterMode = FilterMode.NOMBRE;
  filter: filterHeadersUtility = new filterHeadersUtility();
  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService) {


    this.searchForm = this.fb.group({
      filterSearch: ['nombre', Validators.required],
      searchInput: ['', Validators.required]
    });
  }
  ngOnDestroy(): void {

  }
  updateList(valor: string): void {
    console.log('Valor de searchInput:', valor);

    this.filteredAlumnos = this.filter.filterAlumnos(valor, this.filterMode)
  }
  ngOnInit(): void {
    this.filteredAlumnos = this.alumnosService.getAlumnosHeaders();
    this.filter.setAlumnos(this.filteredAlumnos);
    this.searchForm.get('filterSearch')?.valueChanges.subscribe(valor => {

      const value = (<string>valor);
      console.log('Valor de filterSearch:', value);
      const newFilterMode = FilterMode[value.toUpperCase() as keyof typeof FilterMode];
      this.filterMode = newFilterMode;
      console.log('filter mode: ' + this.filterMode);
    });

    this.searchForm.get('searchInput')?.valueChanges.subscribe(valor => {
      this.updateList(valor);
    });

  }
  onSelectAlumno(alumno: IAlumnoHeaders) {
    console.log('Alumno seleccionado:', alumno);

    this.onSelectAlumnoEvent.emit(alumno);
  }
}






