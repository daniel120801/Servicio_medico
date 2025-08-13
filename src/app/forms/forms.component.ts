import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { QRCodeComponent } from  'angularx-qrcode';
interface QRCode {
  id: string;
  value: string;
  titulo?: string;
  descripcion?: string;
  fecha: Date;
}

@Component({
  selector: 'app-forms',
  imports: [QRCodeComponent,DatePipe],
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

  generarNuevoQR() {
    const newId = (this.qrCodes.length + 1).toString();
    this.qrCodes.push({
      id: newId,
      value: `https://ejemplo.com/form${newId}`,
      titulo: `Nuevo Formulario ${newId}`,
      fecha: new Date()
    });
  }

  // Pipe personalizado para ordenar (simplificado)
  orderByDate(codes: QRCode[]): QRCode[] {
    return [...codes].sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
  }
}