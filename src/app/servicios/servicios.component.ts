import { Component, OnInit, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormConsultaModalComponent } from "../form-consulta-modal/form-consulta-modal.component";
import { FormVacunasModalComponent } from "../form-vacunas-modal/form-vacunas-modal.component";
import { VacunasComponent } from "../vacunas/vacunas.component";
import { VacunasService } from '../core/services/vacunas.service';
import { Vacunas } from '../core/Models/vacunas.model';
import { Consulta } from '../core/Models/consultas.model';
import { ConsultasService } from '../core/services/consultas.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  standalone: true,
  imports: [CommonModule, FormConsultaModalComponent, FormVacunasModalComponent, VacunasComponent]
  ,providers: [VacunasService, ConsultasService]
})
export class ServiciosComponent implements OnInit {
  vacunas: Vacunas[] = [];
  consultas: Consulta[] = [];

  selectedVacuna: string | null = null;
  showVacunas = false;
  formularioConsultaVisible = false;
  formularioVacunasVisible = false;
vacunaSeleccionada: any;
trackByIndex: TrackByFunction<Vacunas> = (index: number, item: Vacunas) => index;

  constructor(private vacunasService: VacunasService, private ConsultasService: ConsultasService) {}

  ngOnInit() {
    this.cargarVacunas();
    this.cargarConsultas();

  }

   cargarConsultas() {
    this.ConsultasService.getConsultas().subscribe((data: Consulta[]) => {
      this.consultas = data;
    });
  }

  cargarVacunas() {
    this.vacunasService.getVacunas().subscribe(data => {
      this.vacunas = data;
    });
  }
  
 onVacunaSeleccionada(item: any) {
  this.vacunaSeleccionada = item;
  this.showVacunas = true;
}

  mostrarFormularioConsulta() {
    this.formularioConsultaVisible = true;
  }

  cerrarFormularioConsulta() {
    this.formularioConsultaVisible = false;
    this.cargarConsultas();
  }

  mostrarFormularioVacunas() {
    this.formularioVacunasVisible = true;
  }

  cerrarFormularioVacunas() {
    this.formularioVacunasVisible = false;
    this.cargarVacunas(); 
  }

  volverDeVacunas() {
    this.showVacunas = false;
    this.selectedVacuna = null;
  }


}
