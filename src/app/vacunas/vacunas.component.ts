import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { IAlumnoHeaders } from '../alumnos/models/alumno.model';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  imports: [NgFor, NgIf],
  styleUrl: './vacunas.component.css',
  standalone: true,
  providers: [AlumnosService]
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
    const nombre = selectedStudent?.general?.nombre || '';
    if (nombre && !this.vacunados.includes(nombre)) {
      this.vacunados.push(nombre);
    }
  }

  get filteredStudents(): IAlumnoHeaders[] {
    return this.students.filter(student =>
      student.general?.nombre?.toLowerCase().includes(this.filter.toLowerCase())
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