import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Agrega esto
import { FormConsultaModalComponent } from "../form-consulta-modal/form-consulta-modal.component";
import { FormVacunasModalComponent } from "../form-vacunas-modal/form-vacunas-modal.component";
import { VacunasComponent } from "../vacunas/vacunas.component";

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  standalone: true,
  imports: [CommonModule, FormConsultaModalComponent, FormVacunasModalComponent, VacunasComponent] // <-- Agrega CommonModule aquí
 // <-- Agrega CommonModule aquí
})
export class ServiciosComponent {
vacunas: string[] =[
  'Vacuna A',
  'Vacuna B',
  'Vacuna C',
  'Vacuna D'
];

  selectedVacuna: string | null = null;

showVacunas = false;

onVacunaSeleccionada(vacuna: any) {
  this.selectedVacuna = vacuna;
    console.log('Vacuna seleccionada:', this.selectedVacuna);
  this.showVacunas = true;
}



  
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