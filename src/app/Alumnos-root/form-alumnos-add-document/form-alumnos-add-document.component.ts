import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUpload } from '../../core/Utilities/FileUpload';
import { AlumnosService } from '../../core/services/alumnos.service';

@Component({
  selector: 'app-form-alumnos-add-document',
  imports: [ReactiveFormsModule],
  templateUrl: './form-alumnos-add-document.component.html',
  styleUrl: './form-alumnos-add-document.component.css'
})
export class FormAlumnosAddDocumentComponent {


  @Output() onAddDocumentEvent: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() onCloseModal: EventEmitter<void> = new EventEmitter<void>();
  addFile: FormGroup;
  file: File | null = null;

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
    this.file = file;
  }

  onSubmit() {

    if (!this.addFile.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file as Blob );
    this.onAddDocumentEvent.emit(formData);
  }
}


