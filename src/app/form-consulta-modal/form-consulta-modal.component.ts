import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../core/Models/consultas.model';

const API_VACUNAS = 'http://localhost/Estadia/API/vacunas.php';

@Component({
  selector: 'app-form-consulta-modal',
  templateUrl: './form-consulta-modal.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./form-consulta-modal.component.css', '../../styles.css'],
})



export class FormConsultaModalComponent implements OnInit, OnChanges {
  formConsulta!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  @Input() consulta: Consulta | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Consulta>();


 // ...existing code...
ngOnInit(): void {
  const hoy = new Date().toISOString().substring(0, 10);
  this.formConsulta = this.fb.group({
    id: [null], // <-- agrega este campo
    nombre: ['', Validators.required],
    fecha: [hoy, Validators.required],
    diagnostico: ['', Validators.required]
  });
  if (this.consulta) {
    this.formConsulta.patchValue({
      id: this.consulta.id, 
      nombre: this.consulta.nombre,
      fecha: this.consulta.fecha,
      diagnostico: this.consulta.diagnostico
    });
  }
}

ngOnChanges(changes: SimpleChanges) {
  if (this.formConsulta) {
    if (changes['consulta'] && this.consulta) {
      this.formConsulta.patchValue({
        id: this.consulta.id, 
        nombre: this.consulta.nombre,
        fecha: this.consulta.fecha,
        diagnostico: this.consulta.diagnostico
      });
    } else if (changes['consulta'] && !this.consulta) {
      this.formConsulta.reset();
    }
  }
}

  onSubmit(): void {
  if (this.formConsulta.valid) {
    const esEdicion = !!this.formConsulta.value.id;
    const datos = {
      accion: esEdicion ? 'editarConsulta' : 'insertarConsulta',
      id: this.formConsulta.value.id,
      nombre: this.formConsulta.value.nombre,
      fecha: this.formConsulta.value.fecha,
      diagnostico: this.formConsulta.value.diagnostico
    };
    this.http.post(API_VACUNAS, datos).subscribe({
      next: () => {
        this.guardar.emit(this.formConsulta.value);
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