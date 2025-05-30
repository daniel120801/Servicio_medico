import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  imports: [NgFor, NgIf],
  styleUrl: './vacunas.component.css',
  standalone: true
})
export class VacunasComponent {

  @Output() volverEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() vacunaNombre: string | null = null;

  filter: string = '';
  students: string[] = [
    'Juan Perez',
    'Maria Lopez',
    'Carlos Sanchez'
  ];
  selectedIndex: number | null = null;


  vacunados: string[] = [];

  selectItem(index: number): void {
    this.selectedIndex = index;
    const selectedStudent = this.filteredStudents[index];
    
    if (selectedStudent && !this.vacunados.includes(selectedStudent)) {
      this.vacunados.push(selectedStudent);
    }
  }

  get filteredStudents(): string[] {
    return this.students.filter(student =>
      student.toLowerCase().includes(this.filter.toLowerCase())
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