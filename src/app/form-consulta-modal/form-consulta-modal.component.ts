import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <-- Agregado ReactiveFormsModule

@Component({
  selector: 'app-form-consulta-modal',
  templateUrl: './form-consulta-modal.component.html',
  standalone: true,
  imports: [ReactiveFormsModule], // <-- Ahora funcionará correctamente
  styleUrls: ['./form-consulta-modal.component.css']
})
export class FormConsultaModalComponent implements OnInit {
  formConsulta!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formConsulta = this.fb.group({
      nombrePaciente: ['', Validators.required],
      fecha: ['', Validators.required],
      diagnostico: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formConsulta.valid) {
      
      this.formConsulta.reset();
    } else {
      
      this.formConsulta.markAllAsTouched(); 
    }
  }
   @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}