import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  imports: [],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit{

  searchForm: FormGroup;
  opcionSeleccionada: any;
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      filterSearch: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.searchForm.get('seleccion')?.valueChanges.subscribe(valor => {
      this.opcionSeleccionada =this.opcionSeleccionada.id;
      console.log('Opción seleccionada:', this.opcionSeleccionada);
    });

        this.searchForm.get('campoTexto')?.valueChanges.subscribe(valor => {
          console.log('Campo de texto cambiado:', valor);
          
    });

  }
  

}
