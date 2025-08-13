import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-create-qr',
  imports: [],
  templateUrl: './form-create-qr.component.html',
  styleUrl: './form-create-qr.component.css'
})
export class FormCreateQrComponent {
descriptionForm: FormGroup;

constructor(private fb: FormBuilder){
    this.descriptionForm = this.fb.group({
      descripcion: [null, Validators.required]
    });
}
onSubmit() {
throw new Error('Method not implemented.');
}
close() {
throw new Error('Method not implemented.');
}
confirm() {
throw new Error('Method not implemented.');
}

}
