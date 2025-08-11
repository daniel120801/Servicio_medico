import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Consulta } from '../core/Models/consultas.model';
import { not } from 'rxjs/internal/util/not';

@Component({
  selector: 'app-form-consulta-modal',
  templateUrl: './form-consulta-modal.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./form-consulta-modal.component.css', '../../styles.css'],
})
export class FormConsultaModalComponent implements OnInit, OnChanges {
  formConsulta!: FormGroup;

  constructor(private fb: FormBuilder) { }

  @Input() consulta: Consulta | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Consulta>();

  ngOnInit(): void {
    const hoy = new Date().toISOString().substring(0, 10);
    this.formConsulta = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      fecha: [hoy, Validators.required],
      diagnostico: ['', Validators.required],
      nota: [''],
      impresion: ['']
    });

    if (this.consulta) {
      this.patchFormValues();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formConsulta && changes['consulta']) {
      if (this.consulta) {
        this.patchFormValues();
      } else {
        this.formConsulta.reset();
        const hoy = new Date().toISOString().substring(0, 10);
        this.formConsulta.patchValue({ fecha: hoy });
      }
    }
  }

  private patchFormValues(): void {
    this.formConsulta.patchValue({
      id: this.consulta?.id,
      nombre: this.consulta?.nombre,
      fecha: this.consulta?.fecha,
      diagnostico: this.consulta?.diagnostico,
      nota: this.consulta?.nota,
      impresion: this.consulta?.impresion
    });
  }

  onSubmit(): void {
    if (this.formConsulta.valid) {
      // Solo emitimos los datos, no hacemos la llamada HTTP aquí
      this.guardar.emit(this.formConsulta.value);
    } else {
      this.formConsulta.markAllAsTouched();
    }
  }

  cerrarModal() {
    this.cerrar.emit();
  }
}