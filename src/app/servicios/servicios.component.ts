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
  imports: [CommonModule, FormConsultaModalComponent, FormVacunasModalComponent, VacunasComponent],
  providers: [VacunasService, ConsultasService]
})
export class ServiciosComponent implements OnInit {
  vacunas: Vacunas[] = [];
  consultas: Consulta[] = [];

  selectedVacuna: string | null = null;
  showVacunas = false;
  formularioConsultaVisible = false;
  formularioVacunasVisible = false;
  vacunaSeleccionada: any;
  consultaSeleccionada: Consulta | null = null;

  trackByIndex: TrackByFunction<Vacunas> = (index: number, item: Vacunas) => index;

  constructor(
    private vacunasService: VacunasService,
    private consultasService: ConsultasService
  ) { }


  ngOnInit() {
    this.cargarVacunas();
    this.cargarConsultas();
  }

  cargarConsultas() {
    this.consultasService.getConsultas().subscribe((data: Consulta[]) => {
      const hoy = new Date();
      const mesActual = hoy.getMonth();
      const anioActual = hoy.getFullYear();

      // Filtrar y ordenar las consultas
      this.consultas = data
        .filter(consulta => {
          const fechaConsulta = new Date(consulta.fecha);
          return (
            fechaConsulta.getMonth() === mesActual &&
            fechaConsulta.getFullYear() === anioActual
          );
        })
        .sort((a, b) => {
          const fechaA = new Date(a.fecha).getTime();
          const fechaB = new Date(b.fecha).getTime();
          return fechaB - fechaA;
        });
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
    this.consultaSeleccionada = null; // Nueva consulta
    this.formularioConsultaVisible = true;
  }

  editarConsulta(consulta: Consulta) {
    this.consultaSeleccionada = { ...consulta }; // Copia para edición
    this.formularioConsultaVisible = true;
  }

  guardarConsulta(consulta: Consulta) {
    if (consulta.id) {
      // Editar
      this.consultasService.actualizarConsulta(consulta).subscribe({
        next: () => {
          this.cargarConsultas();
          this.formularioConsultaVisible = false;
          this.consultaSeleccionada = null;
        },
        error: (err) => {
          console.error('Error al actualizar consulta:', err);
          alert('Error al actualizar la consulta');
        }
      });
    } else {
      // Nuevo
      this.consultasService.agregarConsulta(consulta).subscribe({
        next: () => {
          this.cargarConsultas();
          this.formularioConsultaVisible = false;
          this.consultaSeleccionada = null;
        },
        error: (err) => {
          console.error('Error al agregar consulta:', err);
          alert('Error al agregar la consulta');
        }
      });
    }
  }


  cerrarFormularioConsulta() {
    this.formularioConsultaVisible = false;
    this.consultaSeleccionada = null;
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