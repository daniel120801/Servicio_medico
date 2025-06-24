import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

const API_VACUNAS = 'http://localhost/Estadia/API/vacunas.php';

@Component({
  selector: 'app-form-consulta-modal',
  templateUrl: './form-consulta-modal.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./form-consulta-modal.component.css', '../../styles.css'],
})
export class FormConsultaModalComponent implements OnInit {
  formConsulta!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

ngOnInit(): void {
  const hoy = new Date().toISOString().substring(0, 10); // Formato 'YYYY-MM-DD'
  this.formConsulta = this.fb.group({
    nombrePaciente: ['', Validators.required],
    fecha: [hoy, Validators.required],
    diagnostico: ['', Validators.required]
  });
}

  @Output() cerrar = new EventEmitter<void>();

  onSubmit(): void {
    if (this.formConsulta.valid) {
      const datos = {
        accion: 'insertarConsulta',
        nombre: this.formConsulta.value.nombrePaciente,
        fecha: this.formConsulta.value.fecha,
        diagnostico: this.formConsulta.value.diagnostico
      };
      this.http.post(API_VACUNAS, datos).subscribe({
        next: () => {
          this.formConsulta.reset();
          this.cerrar.emit();
        },
        error: err => {
          alert('Error al guardar consulta');
          console.error(err);
        }
      });
    } else {
      this.formConsulta.markAllAsTouched();
    }
  }

  cerrarModal() {
    this.cerrar.emit();
  }
}