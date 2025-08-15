import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormCreateQrComponent } from "../form-create-qr/form-create-qr.component";
interface QRCode {
  id: string;
  value: string;
  titulo?: string;
  descripcion?: string;
  fecha: Date;
}

@Component({
  selector: 'app-forms',
  imports: [DatePipe, FormCreateQrComponent],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {

  qrCodes: QRCode[] = [
    {
      id: '1',
      value: 'https://ejemplo.com/form1',
      titulo: 'Formulario de Contacto',
      descripcion: 'Para solicitudes generales',
      fecha: new Date('2023-12-15')
    },
    {
      id: '2',
      value: 'https://ejemplo.com/form2',
      titulo: 'Registro de Usuarios',
      fecha: new Date('2023-12-20')
    }
  ];
  showModalNewQR: boolean = false;

  generarNuevoQR($value: string) {
    const newId = (this.qrCodes.length + 1).toString();
    this.closeModal()
    this.qrCodes.push({
      id: newId,
      value: `https://ejemplo.com/form${newId}`,
      titulo: $value,
      fecha: new Date()
    });
  }

  openQR(arg0: string) {

  }

  openModal() {
    this.showModalNewQR = true;
  }

  closeModal() {
    this.showModalNewQR = false;
  }

}