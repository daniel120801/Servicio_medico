import { Component } from '@angular/core';
import { FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-registro-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './form-registro-modal.component.html',
  styleUrl: './form-registro-modal.component.css'
})
export class FormRegistroModalComponent {
  formRegistro: FormGroup;
  constructor(private fb: FormBuilder) {
  }
}
