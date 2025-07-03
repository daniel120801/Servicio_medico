import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnosService } from '../../core/services/alumnos.service';
import { Alumno } from '../../core/Models/alumno.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-modify-stats-medical',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-modify-stats-medical.component.html',
  styleUrl: './form-modify-stats-medical.component.css'
})
export class FormModifyStatsMedicalComponent implements OnInit {


  medicalForm: FormGroup;
  @Output() toSegMedEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() onModifyAlumno: EventEmitter<{ key: string, value: any }[]> = new EventEmitter<{ key: string, value: any }[]>();
  @Input() alumno: Alumno | null = null;
  fieldUpdatingList: string[] = [];

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

    const b = {
      x: 'hi'
    }
    console.log(b);

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
  applyField(field: string) {
    const control = this.medicalForm.get(field);
    if (!control || !this.alumno) return;

    if (control.value === (this.alumno as any)[field]) return;

    this.fieldUpdatingList.push(field);

    this.alumnosService.modifyStat(this.alumno.matricula, field, control.value).subscribe({
      next: res => {
        this.fieldUpdatingList = this.fieldUpdatingList.filter(f => f !== field);
        if (res) {
          this.onModifyAlumno.emit(
            Object.keys(this.medicalForm.controls).map(key => ({
              key,
              value: this.medicalForm.get(key)?.value
            }))
          );
        } else {
           //TODO:agregar algun efecto visual de los cambios
          console.log('fallo la edicion');
        }
      }, error: (error) => {
        //TODO:agregar algun efecto visual de los cambios
      }
    });
  }

  onSubmit() {
    if (!this.alumno) return;
    const body = new FormData();
    Object.keys(this.medicalForm.controls).forEach(key => {
      body.append(key, this.medicalForm.get(key)?.value);
    });
    this.fieldUpdatingList.push('all')
    this.alumnosService.modifyAllStats(this.alumno.matricula, body).subscribe({
      next: x => {
        console.log(x);
        this.fieldUpdatingList = this.fieldUpdatingList.filter(field => field !== 'all');

        if (x && x.status === 'success')
          console.log('campos editados con exito: ', x.data);
        else {
          console.log('algo fallo');

        }
      }
    }
      //TODO:dar aviso  visual al momento de actualizar el campo


    )
  }

}


