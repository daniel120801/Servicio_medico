import { Component } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-registro-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './form-registro-modal.component.html',
  styleUrl: './form-registro-modal.component.css'
})
export class FormRegistroModalComponent { 
  formRegistro!: FormGroup;
  constructor(private fb: FormBuilder) {
  }
  /* onSubmit() {
   throw new Error('Method not implemented.');
}*/
  ngOnInit() {
    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      matricula: ['', Validators.required]
    });
  }

  get f() { return this.formRegistro.controls; }

  onSubmit() {
    if (this.formRegistro.invalid) {
      return;
    }
    // Aquí puedes manejar el envío del formulario
    console.log('Formulario enviado', this.formRegistro.value);
  }
}
