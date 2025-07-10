import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VacunasService } from '../core/services/vacunas.service'; // <-- Importa el servicio

@Component({
  selector: 'app-form-vacunas-modal',
  templateUrl: './form-vacunas-modal.component.html',
  imports: [ReactiveFormsModule],
  standalone: true,
  styleUrls: ['./form-vacunas-modal.component.css', '../../styles.css'],
  providers: [VacunasService] // <-- Asegúrate de proveer el servicio
})
export class FormVacunasModalComponent implements OnInit {
  vacunaForm!: FormGroup;

  constructor(private fb: FormBuilder, private vacunasService: VacunasService) { }

  ngOnInit(): void {
    this.vacunaForm = this.fb.group({
      vacuna: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  @Output() cerrar = new EventEmitter<void>();

  onSubmit(): void {
    if (this.vacunaForm.valid) {
      const datos = {
        accion: 'registrarVacuna',
        nombre: this.vacunaForm.value.vacuna,
        fecha: this.vacunaForm.value.fecha
      };
      this.vacunasService.agregarVacuna(datos).subscribe({
        next: () => {
          this.vacunaForm.reset();
          this.cerrar.emit();
        },
        error: err => {
          alert('Error al guardar vacuna');
          console.error(err);
        }
      });
    } else {
      this.vacunaForm.markAllAsTouched();
    }
  }

  cerrarModal() {
    this.cerrar.emit();
  }
}