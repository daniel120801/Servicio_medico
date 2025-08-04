import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlumnosService } from '../../core/services/alumnos.service';
import { Alumno } from '../../core/Models/alumno.model';
import { FieldStatusIndicatorComponent } from '../../shared/field-status-indicator/field-status-indicator.component';

/**
 * Componente para modificar los datos médicos de un alumno.
 * Permite editar campos individuales o todos los campos médicos a la vez, mostrando el estado de cada campo (actualizando, éxito, error, advertencia).
 *
 * @selector app-form-modify-stats-medical
 * @imports ReactiveFormsModule, FieldStatusIndicatorComponent
 * @templateUrl ./form-modify-stats-medical.component.html
 * @styleUrl ./form-modify-stats-medical.component.css
 *
 * @example
 * <app-form-modify-stats-medical [alumno]="alumno" (toSegMedEvent)="onBack()" (onModifyAlumno)="onAlumnoModified($event)"></app-form-modify-stats-medical>
 *
 * @property {Alumno | null} alumno - El alumno cuyos datos médicos se van a modificar. Si es null, el componente retorna a la vista anterior.
 * @property {EventEmitter<void>} toSegMedEvent - Evento emitido para regresar a la sección anterior.
 * @property {EventEmitter<{ key: string, value: any }[]>} onModifyAlumno - Evento emitido cuando se modifica algún campo médico, enviando los campos modificados.
 *
 * @property {FormGroup} medicalForm - Formulario reactivo que contiene los campos médicos del alumno.
 * @property {string[]} fieldUpdatingList - Lista de campos que están en proceso de actualización.
 * @property {string[]} fieldErrorList - Lista de campos que han tenido error al actualizarse.
 * @property {string[]} fieldSuccessList - Lista de campos que se actualizaron correctamente.
 * @property {string[]} fieldWarningList - Lista de campos que no han tenido cambios.
 * @property {string[]} fields - Lista de nombres de los campos médicos que se pueden modificar.
 *
 * @method ngOnInit Inicializa el formulario con los datos del alumno. Si no hay alumno, emite el evento para regresar.
 * @method volver Emite el evento para regresar a la sección anterior.
 * @method applyField Aplica la modificación de un campo individual, actualizando su estado y notificando el resultado.
 * @method getWarningMessage Devuelve el mensaje de advertencia para un campo sin cambios.
 * @method onSubmit Envía todos los cambios del formulario si hay modificaciones, actualizando el estado general.
 * @method updateFieldStatus Actualiza las listas de estado de los campos según el resultado de la operación.
 * @method emitModifiedFieldAlumno Emite el evento de modificación para un campo específico y para todos los campos.
 * @method emitModifiedAlumno Emite el evento de modificación para todos los campos médicos.
 *
 * @remarks
 * - Utiliza servicios para modificar los datos médicos del alumno en el backend.
 * - Muestra indicadores visuales del estado de cada campo (actualizando, éxito, error, advertencia).
 * - Evita enviar cambios si los datos no han sido modificados.
 */
@Component({
  selector: 'app-form-modify-stats-medical',
  imports: [ReactiveFormsModule, FieldStatusIndicatorComponent],
  templateUrl: './form-modify-stats-medical.component.html',
  styleUrl: './form-modify-stats-medical.component.css'
})
export class FormModifyStatsMedicalComponent implements OnInit {

  @Input() alumno: Alumno | null = null;
  @Output() toSegMedEvent = new EventEmitter<void>();
  @Output() onModifyAlumno = new EventEmitter<{ key: string, value: any }[]>();

  medicalForm: FormGroup;
  fieldUpdatingList: string[] = [];
  fieldErrorList: string[] = [];
  fieldSuccessList: string[] = [];
  fieldWarningList: string[] = [];
  private readonly fields = [
    'NSS', 'afiliacion', 'RH', 'donador', 'peso', 'talla',
    'alergias', 'enfermedades', 'tratamientos', 'discapacidad', 'enCasoDeAccidente'
  ];

  constructor(private alumnosService: AlumnosService, private fb: FormBuilder) {
    this.medicalForm = this.fb.group(
      Object.fromEntries(this.fields.map(field => [field, ['', Validators.required]]))
    );
  }

  ngOnInit(): void {
    if (!this.alumno) {
      this.volver();
      return;
    }
    this.medicalForm.patchValue(
      Object.fromEntries(this.fields.map(field => [field, (this.alumno as any)[field]]))
    );
  }

  volver() {
    this.toSegMedEvent.emit();
  }

  applyField(field: string) {
    const control = this.medicalForm.get(field);
    if (!control || !this.alumno) return;
    if (control.value === (this.alumno as any)[field]) {
      this.updateFieldStatus(field, 'warning');
      return;
    }

    this.updateFieldStatus(field, 'updating');
    this.alumnosService.modifyStat(this.alumno.matricula, field, control.value).subscribe({
      next: res => {
        this.updateFieldStatus(field, res ? 'success' : 'error');
        if (res) this.emitModifiedFieldAlumno(field);
      },
      error: () => this.updateFieldStatus(field, 'error')
    });
  }

  getWarningMessage(_: string): string {
    return 'Sin cambios';
  }

  onSubmit() {
    if (!this.alumno) return;

    const hasChanges = this.fields.some(
      field => this.medicalForm.get(field)?.value !== (this.alumno as any)[field]
    );
    if (!hasChanges) {
      this.updateFieldStatus('all', 'warning');
      return;
    }

    const body = new FormData();
    this.fields.forEach(field => body.append(field, this.medicalForm.get(field)?.value));
    this.updateFieldStatus('all', 'updating');
    this.alumnosService.modifyAllStats(this.alumno.matricula, body).subscribe({
      next: x => this.updateFieldStatus('all', x && x.status === 'success' ? 'success' : 'error'),
      error: () => this.updateFieldStatus('all', 'error')
    });
  }

  private updateFieldStatus(field: string, status: 'updating' | 'success' | 'error' | 'warning') {
    this.fieldUpdatingList = this.fieldUpdatingList.filter(f => f !== field);
    this.fieldErrorList = this.fieldErrorList.filter(f => f !== field);
    this.fieldSuccessList = this.fieldSuccessList.filter(f => f !== field);
    this.fieldWarningList = this.fieldWarningList.filter(f => f !== field);

    if (status === 'updating') this.fieldUpdatingList.push(field);
    else if (status === 'success') this.fieldSuccessList.push(field);
    else if (status === 'error') this.fieldErrorList.push(field);
    else if (status === 'warning') this.fieldWarningList.push(field);
  }

  private emitModifiedFieldAlumno(field: string) {

    // Emit only the modified field as an array with one object
    this.onModifyAlumno.emit([
      {
      key: field,
      value: this.medicalForm.get(field)?.value
      }
    ]);

    this.onModifyAlumno.emit(
      this.fields.map(key => ({
        key,
        value: this.medicalForm.get(key)?.value
      }))
    );
  }

  private emitModifiedAlumno() {
    this.onModifyAlumno.emit(
      this.fields.map(key => ({
        key,
        value: this.medicalForm.get(key)?.value
      }))
    );
  }
}
