import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Alumno } from '../core/Models/alumno.model';
import { AlumnosServiceService } from '../core/servicesComponent/alumnos.service';

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
  filteredAlumnos: Alumno[] = [];
  headers:Headers = null;
  constructor(private fb: FormBuilder, private alumnosService: AlumnosServiceService) {
    this.searchForm = this.fb.group({
      filterSearch: ['nombre', Validators.required],
      searchInput: ['', Validators.required]
    });
  }
  ngOnInit(): void {

    this.filteredAlumnos = headers;


    this.searchForm.get('filterSearch')?.valueChanges.subscribe(valor => {

      //this.opcionSeleccionada = this.opcionSeleccionada.id;
      console.log('Opción seleccionada:', valor);
    });

    this.searchForm.get('searchInput')?.valueChanges.subscribe(valor => {
      console.log('Campo de texto cambiado:', valor);

      this.filteredAlumnos =  this.alumnosService.filterAlumnosByText(valor);
      console.log('nueva lista:' +  this.filteredAlumnos);
      
    });

  }


}
