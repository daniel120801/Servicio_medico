import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-vacunas-modal',
  templateUrl: './form-vacunas-modal.component.html',
  imports: [ReactiveFormsModule], // <-- Agrega esto
  standalone: true,
  styleUrls: ['./form-vacunas-modal.component.css']
})

export class FormVacunasModalComponent implements OnInit {
  vacunaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.vacunaForm = this.fb.group({
      vacuna: ['', Validators.required],
      dosis: [null, [Validators.required, Validators.min(1)]],
      fecha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.vacunaForm.valid) {
      console.log('Datos del formulario:', this.vacunaForm.value);
      this.vacunaForm.reset();
    } else {
      console.log('Formulario inválido');
    }
  }
   @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}


 