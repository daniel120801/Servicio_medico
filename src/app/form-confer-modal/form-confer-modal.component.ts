import { Component } from '@angular/core';
import { Conferencia } from '../core/Models/conferencia.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConferenciaServiceService } from '../core/services/conferencia.service';
@Component({
  selector: 'app-form-confer-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './form-confer-modal.component.html',
  styleUrl: './form-confer-modal.component.css',
  providers: [ConferenciaServiceService]
})
export class FormConferModalComponent {

  conferencia: Conferencia = new Conferencia('', '', '', '', '', '');
  formConfer: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, public conferenciaService: ConferenciaServiceService) {
    this.formConfer = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      presentador: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  // Método para cerrar el modal
  volver(): void {
    this.router.navigate(['/confer']);
  }

  // Método para guardar la conferencia
  save(): void {
    this.formConfer.markAllAsTouched();
    if (this.formConfer.invalid) {


      return;
    }
    this.conferencia = new Conferencia(
      '',
      this.formConfer.value.nombre,
      this.formConfer.value.fecha,
      this.formConfer.value.hora,
      this.formConfer.value.presentador,
      this.formConfer.value.descripcion,
    );



    this.conferenciaService.addConferencia(this.conferencia).subscribe({
      next: (response) => {
        this.volver();
      },
      error: (error) => {
        console.error('Error al guardar la conferencia:', error);
      }
    });
  }
}
