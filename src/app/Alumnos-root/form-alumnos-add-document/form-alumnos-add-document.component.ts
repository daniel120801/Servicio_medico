import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

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


