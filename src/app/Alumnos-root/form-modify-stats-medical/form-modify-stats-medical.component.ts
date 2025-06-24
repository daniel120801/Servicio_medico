import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnosService } from '../../core/services/alumnos.service';
import { Alumno } from '../../core/Models/alumno.model';

@Component({
  selector: 'app-form-modify-stats-medical',
  imports: [ReactiveFormsModule],
  templateUrl: './form-modify-stats-medical.component.html',
  styleUrl: './form-modify-stats-medical.component.css'
})
export class FormModifyStatsMedicalComponent implements OnInit {

  medicalForm: FormGroup;
  @Output() toSegMedEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() alumno: Alumno | null = null;

  constructor(private alumnosService: AlumnosService, private fb: FormBuilder) {
    this.medicalForm = this.fb.group({
      NSS: ['', Validators.required],
      afiliacion: ['', Validators.required],
      RH: ['', Validators.required],
      donador: ['', Validators.required],
      peso: ['', Validators.required],
      talla: ['', Validators.required],
      alergias: ['', Validators.required],
      enfermedades: ['', Validators.required],
      tratamientos: ['', Validators.required],
      discapacidad: ['', Validators.required],
      enCasoDeAccidente: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.alumno) {
      this.volver();
      return;
    }
    // Actualiza el formulario con los datos del alumno cuando esté disponible
    this.medicalForm.patchValue({
      NSS: this.alumno.NSS,
      afiliacion: this.alumno.afiliacion,
      RH: this.alumno.RH,
      donador: this.alumno.donador,
      peso: this.alumno.peso,
      talla: this.alumno.talla,
      alergias: this.alumno.alergias,
      enfermedades: this.alumno.enfermedades,
      tratamientos: this.alumno.tratamientos,
      discapacidad: this.alumno.discapacidad,
      enCasoDeAccidente: this.alumno.enCasoDeAccidente
    });
  }

  volver() {
    this.toSegMedEvent.emit();
  }

  onSubmit() {
    console.log('submit');

  }

}
