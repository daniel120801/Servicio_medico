import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AlumnosServiceService, FilterMode } from '../core/servicesComponent/alumnos.service';
import { AlumnoHeaders } from '../core/Models/alumnoHeaders.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alumnos',
  imports: [ReactiveFormsModule],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css',
  providers: [AlumnosServiceService]
})
export class AlumnosComponent implements OnInit {


  searchForm: FormGroup;
  opcionSeleccionada: any;
  filteredAlumnos: AlumnoHeaders[] = [];
  filterMode: FilterMode = FilterMode.NOMBRE;
  headers: any = null;
  constructor(private fb: FormBuilder, private alumnosService: AlumnosServiceService, private router: Router) {
    this.searchForm = this.fb.group({
      filterSearch: ['nombre', Validators.required],
      searchInput: ['', Validators.required]
    });
  }
  updateList(valor: string): void {
    console.log('Valor de searchInput:', valor);

    this.filteredAlumnos = this.headers.filterAlumnos(valor, this.filterMode)
  }
  ngOnInit(): void {

    this.headers = new this.alumnosService.headers(this.alumnosService);
    this.filteredAlumnos = this.headers.getAlumnosHeaders();

    this.searchForm.get('filterSearch')?.valueChanges.subscribe(valor => {
      const value = (<string>valor);
      const newFolterMode = FilterMode[value.toUpperCase() as keyof typeof FilterMode];
      this.filterMode = newFolterMode;
      console.log('filter mode: ' + this.filterMode);

    });

    this.searchForm.get('searchInput')?.valueChanges.subscribe(valor => {
      this.updateList(valor);
    })

  }
  onSelectAlumno(alumno: AlumnoHeaders) {
    console.log('Alumno seleccionado:', alumno);
    this.router.navigate(['/perfilAlumno']);
    // Aquí puedes realizar la acción que desees con el alumno seleccionado
  }
}




