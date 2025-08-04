import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

/**
 * Componente para agregar documentos de alumnos.
 * 
 * Este componente permite seleccionar y subir archivos de tipo PDF, Word o Excel,
 * validando el tipo de archivo antes de emitir el evento de subida. También gestiona
 * el cierre del modal y muestra mensajes de error en caso de selección inválida.
 * 
 * @selector app-form-alumnos-add-document
 * @templateUrl ./form-alumnos-add-document.component.html
 * @styleUrl ./form-alumnos-add-document.component.css
 * @imports ReactiveFormsModule, NgIf
 * 
 * @output onAddDocumentEvent - Evento emitido cuando se selecciona y valida correctamente un archivo. 
 *                              El payload es un objeto FormData con el archivo adjunto.
 * @output onCloseModal - Evento emitido para cerrar el modal de carga de documentos.
 * 
 * @property addFile - FormGroup que gestiona el estado y validación del campo de archivo.
 * @property file - Archivo seleccionado por el usuario. Puede ser null si no hay archivo válido.
 * @property allowedTypes - Lista de tipos MIME permitidos para los archivos (PDF, Word, Excel).
 * @property errorMsg - Mensaje de error mostrado al usuario en caso de selección inválida.
 * 
 * @method close - Emite el evento para cerrar el modal.
 * @method onChangeFile - Maneja el evento de cambio de archivo, valida el tipo y actualiza el estado.
 * @param event - Evento de cambio del input de archivo.
 * 
 * @method onSubmit - Valida el formulario y el archivo seleccionado, emite el evento de subida si es válido.
 */
@Component({
  selector: 'app-form-alumnos-add-document',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form-alumnos-add-document.component.html',
  styleUrl: './form-alumnos-add-document.component.css'
})
export class FormAlumnosAddDocumentComponent {


  @Output() onAddDocumentEvent: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() onCloseModal: EventEmitter<void> = new EventEmitter<void>();
  addFile: FormGroup;
  file: File | null = null;
  allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  errorMsg: string = '';

  constructor(private fb: FormBuilder) {
    this.addFile = this.fb.group({
      file: [null, Validators.required]
    });
  }

  close() {
    this.onCloseModal.emit();
  }

  onChangeFile(event: any) {
    const file = event.target.files[0];
    if (file && !this.allowedTypes.includes(file.type)) {
      this.errorMsg = 'Tipo de archivo no permitido. Solo PDF, Word o Excel.';
      this.file = null;
      this.addFile.get('file')?.setValue(null);
      return;
    }
    this.errorMsg = '';
    this.file = file;
  }

  onSubmit() {
    if (!this.addFile.valid || !this.file) {
      this.errorMsg = 'Debe seleccionar un archivo válido.';
      return;
    }
    if (!this.allowedTypes.includes(this.file.type)) {
      this.errorMsg = 'Tipo de archivo no permitido. Solo PDF, Word o Excel.';
      return;
    }
    this.errorMsg = '';
    const formData = new FormData();
    formData.append('file', this.file as Blob );
    this.onAddDocumentEvent.emit(formData);
  }
}


