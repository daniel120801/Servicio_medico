import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlumnosService } from '../../core/services/alumnos.service';
import { Alumno } from '../../core/Models/alumno.model';
import { CommonModule } from '@angular/common';
import { filterConferenciasUtility as filterUtility } from '../../core/Utilities/filterConferenciasUtility';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Conferencia } from '../../core/Models/conferencia.model';

@Component({
  selector: 'app-confer-asistidas-alumno',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confer-asistidas-alumno.component.html',
  styleUrl: './confer-asistidas-alumno.component.css'
})
export class ConferAsistidasAlumnoComponent implements OnInit {


  @Output() toConferencesEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() toPerfilEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() alumno: Alumno | null = null
  filter: filterUtility = new filterUtility();
  searchForm: FormGroup;
  filteredConferencias: Conferencia[] | null = [];
  constructor(private alumnosService: AlumnosService,
    private fb: FormBuilder

  ) {
    this.searchForm = this.fb.group({
      searchInput: ['']
    });
  }
  ngOnInit(): void {
    if (!this.alumno) {
      this.volver();
    }
    this.filteredConferencias = this.alumno === null ? [] : this.alumno.conferenciasAsistidas
    this.filter.setConferencias(this.filteredConferencias);

    this.searchForm.get('searchInput')?.valueChanges.subscribe(valor => {
      this.updateList(valor);
    });
  }
  updateList(valor: any) {
    this.filteredConferencias = this.filter.filterConferencias(valor)
  }

  volver() {
    this.toPerfilEvent.emit();
  }
  onConferenceSelected(conferencia: Conferencia) {
    
  }
  toConferences() {
    this.toConferencesEvent.emit();
    

  }

}
