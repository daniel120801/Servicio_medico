import { Component, OnInit } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  imports: [ReactiveFormsModule],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit {

  searchForm: FormGroup;
  opcionSeleccionada: any;
  constructor(private fb: FormBuilder) {

    this.searchForm = this.fb.group({
      filterSearch: ['', Validators.required],
      searchInput: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.searchForm.get('filterSearch')?.valueChanges.subscribe(valor => {
      //this.opcionSeleccionada = this.opcionSeleccionada.id;
      console.log('Opción seleccionada:', valor);
    });

    this.searchForm.get('searchInput')?.valueChanges.subscribe(valor => {
      console.log('Campo de texto cambiado:', valor);

    });

  }


}
