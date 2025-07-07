import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnosService } from '../../core/services/alumnos.service';
import { IAlumnoHeaders } from '../../core/Models/alumno.model';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Searcher, FilterMode } from '../../core/Utilities/Searcher';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos-buscador.component.html',
  styleUrls: ['./alumnos-buscador.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AlumnosComponent implements OnInit, OnDestroy {
  @Output() onSelectAlumnoEvent = new EventEmitter<IAlumnoHeaders>();
  searchForm!: FormGroup;
  filteredAlumnos: IAlumnoHeaders[] = [];
  private requestSearch?: Subscription;
  private searcher: Searcher;
  searching = true;

  constructor(
    private fb: FormBuilder,
    alumnosService: AlumnosService
  ) {
    this.searcher = alumnosService.getSearcher();
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      filterSearch: ['nombre', Validators.required],
      searchInput: ['', Validators.required]
    });

    this.requestSearch = this.searcher.search().subscribe(val => {
      this.filteredAlumnos = val;
      this.searcher.setFilter(FilterMode.NOMBRE);
      this.searching = false;
    });

    this.searchForm.get('filterSearch')?.valueChanges.subscribe(valor => {
      const value = String(valor);
      const newFilterMode = FilterMode[value.toUpperCase() as keyof typeof FilterMode];
      this.searcher.setFilter(newFilterMode);
      this.updateList(true);
    });

    this.searchForm.get('searchInput')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(valor => {
      this.search(valor);
    });
  }

  updateList(force = false): void {
    this.searching = true;
    this.requestSearch?.unsubscribe();
    this.requestSearch = this.searcher.update(force).subscribe(val => {
      this.filteredAlumnos = val;
      this.searching = false;
    });
  }

  search(value: string): void {
    this.searching = true;
    this.requestSearch?.unsubscribe();
    this.requestSearch = this.searcher.search(value).subscribe({
      next: response => {
        this.filteredAlumnos = response;
        this.searching = false;
      },
      error: () => {
        this.searching = false;
      }
    });
  }

  onNextPag(): void {
    this.searcher.nextPage();
    this.updateList(true);
  }

  onPrevPag(): void {
    this.searcher.prevPage();
    this.updateList(true);
  }

  hasMorePages(): boolean {
    return this.filteredAlumnos.length > 0 && this.filteredAlumnos.length % 10 === 0;
  }
  getPage(){
    return this.searcher.getPage();
  }

  onSelectAlumno(alumno: IAlumnoHeaders): void {
    this.onSelectAlumnoEvent.emit(alumno);
  }

  ngOnDestroy(): void {
    this.requestSearch?.unsubscribe();
  }
}
