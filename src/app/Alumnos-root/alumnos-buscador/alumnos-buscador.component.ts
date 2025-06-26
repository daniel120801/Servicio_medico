import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AlumnosService, FilterMode } from '../../core/services/alumnos.service';
import { IAlumnoHeaders } from '../../core/Models/alumno.model';
import { filterHeadersUtility } from '../../core/Utilities/filterHeadersUtility';


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

  updateList(valor: string): void {
    this.filteredAlumnos = this.filter.filterAlumnos(valor, this.filterMode)
  }
  ngOnInit(): void {
    this.alumnosService.getHeaders().subscribe({
      next: (alumnos) => {

        this.filteredAlumnos = alumnos;
        this.filter.setAlumnos(this.filteredAlumnos);
      },
      error:any => {
      console.error('Error al obtener los alumnos:', any);
    }
     }
    );
    
    this.searchForm.get('filterSearch')?.valueChanges.subscribe(valor => {

      const value = (<string>valor);

      const newFilterMode = FilterMode[value.toUpperCase() as keyof typeof FilterMode];
      this.filterMode = newFilterMode;

    });

this.searchForm.get('searchInput')?.valueChanges.subscribe(valor => {
  this.updateList(valor);
});

  }
onSelectAlumno(alumno: IAlumnoHeaders) {


  this.onSelectAlumnoEvent.emit(alumno);
}
ngOnDestroy(): void {

}
}






