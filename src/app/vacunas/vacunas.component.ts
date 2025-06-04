import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AlumnosService } from '../core/services/alumnos.service';
import { IAlumnoHeaders } from '../core/Models/alumno.model';
import { provideSharedFeature } from '../core/providers/alumnos.providers';

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

  filter: string = '';
  students: IAlumnoHeaders[] = [];
  selectedIndex: number | null = null;
  vacunados: string[] = [];

  constructor(private alumnosService: AlumnosService) {}

  ngOnInit(): void {
    this.alumnosService.getHeaders().subscribe(alumnos => {
      this.students = alumnos;
    });
  }

  selectItem(index: number): void {
    this.selectedIndex = index;
    const selectedStudent = this.filteredStudents[index];
    const nombre = selectedStudent?.nombre || '';
    if (nombre && !this.vacunados.includes(nombre)) {
      this.vacunados.push(nombre);
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