import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-create-qr',
  imports: [ReactiveFormsModule],
  templateUrl: './form-create-qr.component.html',
  styleUrl: './form-create-qr.component.css'
})
export class FormCreateQrComponent {
  descriptionForm: FormGroup;

  @Output() closeEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() onConfirmEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.descriptionForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  close() {
    this.closeEvent.emit();
  }
  confirm() {
    if (this.descriptionForm.valid) {
      this.onConfirmEvent.emit(this.descriptionForm.value.descripcion);
    }

  }

}
