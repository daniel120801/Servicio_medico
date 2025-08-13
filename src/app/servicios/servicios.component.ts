import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormConsultaModalComponent } from "../form-consulta-modal/form-consulta-modal.component";
import { FormVacunasModalComponent } from "../form-vacunas-modal/form-vacunas-modal.component";
import { VacunasComponent } from "../vacunas/vacunas.component";
import { VacunasService } from '../core/services/vacunas.service';
import { Vacunas } from '../core/Models/vacunas.model';
import { Consulta } from '../core/Models/consultas.model';
import { ConsultasService } from '../core/services/consultas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FormConsultaModalComponent, FormVacunasModalComponent, VacunasComponent],
  providers: [VacunasService, ConsultasService]
})
export class ServiciosComponent implements OnInit {
  vacunas: Vacunas[] = [];
  consultas: Consulta[] = [];
  todasConsultas: Consulta[] = []; // Para almacenar todas las consultas

  searchTerm: string = ''; // Para el buscador

  selectedVacuna: string | null = null;
  showVacunas = false;
  formularioConsultaVisible = false;
  formularioVacunasVisible = false;
  vacunaSeleccionada: any;
  consultaSeleccionada: Consulta | null = null;

  constructor(
    private vacunasService: VacunasService,
    private consultasService: ConsultasService,
    private router:Router
  ) { }

  ngOnInit() {
    this.cargarVacunas();
    this.cargarConsultas();
  }

  cargarConsultas() {
    this.consultasService.getConsultas().subscribe((data: Consulta[]) => {
      this.todasConsultas = data; // Guardamos todas las consultas
      this.filtrarConsultas(); // Filtramos según el estado del buscador
    });
  }

  filtrarConsultas() {
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const anioActual = hoy.getFullYear();

    // Función para quitar acentos y poner en minúsculas
    const normalizar = (texto: string) =>
      texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    if (this.searchTerm.trim() === '') {
      // Mostrar solo las del mes actual
      this.consultas = this.todasConsultas
        .filter(consulta => {
          const fechaConsulta = new Date(consulta.fecha);
          return (
            fechaConsulta.getMonth() === mesActual &&
            fechaConsulta.getFullYear() === anioActual
          );
        })
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    } else {
      // Mostrar todas las que coincidan con el nombre (sin acentos ni mayúsculas)
      const term = normalizar(this.searchTerm);
      this.consultas = this.todasConsultas
        .filter(consulta => normalizar(consulta.nombre).includes(term))
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    }
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
    this.consultaSeleccionada = null;
    this.formularioConsultaVisible = true;
  }

  editarConsulta(consulta: Consulta) {
    this.consultaSeleccionada = { ...consulta };
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

  toForms(){
    this.router.navigate(['forms']);
  }
  toFormsVacunas(){
  }
  volverDeVacunas() {
    this.showVacunas = false;
    this.selectedVacuna = null;
  }
}
