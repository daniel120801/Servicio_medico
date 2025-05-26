import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Agrega esto
import { FormConsultaModalComponent } from "../form-consulta-modal/form-consulta-modal.component";
import { FormVacunasModalComponent } from "../form-vacunas-modal/form-vacunas-modal.component";

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  standalone: true,
  imports: [CommonModule, FormConsultaModalComponent, FormVacunasModalComponent] // <-- Agrega CommonModule aquí
})
export class ServiciosComponent {
  formularioConsultaVisible = false;
  formularioVacunasVisible = false;

  mostrarFormularioConsulta() {
    console.log('Abriendo formulario de consulta');
    this.formularioConsultaVisible = true;
  }

  cerrarFormularioConsulta() {
    this.formularioConsultaVisible = false;
  }

  mostrarFormularioVacunas() {
    this.formularioVacunasVisible = true;
  }

  cerrarFormularioVacunas() {
    this.formularioVacunasVisible = false;
  }
}