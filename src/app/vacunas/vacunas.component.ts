import { Component } from '@angular/core';

@Component({
  selector: 'app-vacunas',
  imports: [],
  templateUrl: './vacunas.component.html',
  styleUrl: './vacunas.component.css'
})
export class VacunasComponent {

  filter: string = '';
  students: string[] = [
    'Juan Perez',
    'Maria Lopez',
    'Carlos Sanchez'
  ];
  selectedIndex: number | null = null;

  get filteredStudents(): string[] {
    return this.students.filter(student =>
      student.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filter = input.value;
  }

  selectItem(index: number): void {
    this.selectedIndex = index;
  }
}
