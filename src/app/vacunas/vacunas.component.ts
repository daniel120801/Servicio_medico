import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AlumnosService } from '../core/services/alumnos.service';
import { IAlumnoHeaders } from '../core/Models/alumno.model';
import { provideSharedFeature } from '../core/providers/alumnos.providers';
import { VacunasService } from '../core/services/vacunas.service';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  imports: [NgFor, NgIf],
  styleUrl: './vacunas.component.css',
  standalone: true,
  providers: [provideSharedFeature]
})
export class VacunasComponent implements OnInit {

  @Output() volverEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() vacunaNombre: string | null = null;
  @Input() vacunaId: string | number | null = null; 

  filter: string = '';
  students: IAlumnoHeaders[] = [];
  selectedIndex: number | null = null;
  vacunados: string[] = [];

  constructor(
    private alumnosService: AlumnosService,
    private vacunasService: VacunasService
  ) {}

 ngOnInit(): void {
  this.alumnosService.getHeaders().subscribe(alumnos => {
    this.students = alumnos;
  });

  if (this.vacunaId) {
  this.vacunasService.obtenerVacunadosPorVacuna(this.vacunaId).subscribe(nombres => {
    console.log('Vacunados:', nombres);
    this.vacunados = nombres;
  });
}
}

  selectItem(index: number): void {
    this.selectedIndex = index;
    const selectedStudent = this.filteredStudents[index];
    const nombre = selectedStudent?.nombre || '';
    const estudiante_id = selectedStudent?.id;
    if (this.vacunaId && estudiante_id) {
      this.vacunasService.estaAlumnoVacunado(estudiante_id, this.vacunaId).subscribe({
        next: (yaVacunado: boolean) => {
          if (!yaVacunado) {
            this.vacunasService.asociarAlumnoVacuna(estudiante_id, this.vacunaId!).subscribe({
              next: () => {
                this.vacunasService.obtenerVacunadosPorVacuna(this.vacunaId!).subscribe(nombres => {
                  this.vacunados = nombres;
                });
              },
              error: () => {
                alert('Error al asociar alumno con vacuna');
              }
            });
          } else {
            alert('El alumno ya está vacunado con esta vacuna');
          }
        },
        error: () => {
          alert('Error al verificar si el alumno está vacunado');
        }
      });
    }
  }

  get filteredStudents(): IAlumnoHeaders[] {
    return this.students.filter(student =>
      student.nombre?.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filter = input.value;
  }

  volver() {
    this.volverEvent.emit();
  }
}