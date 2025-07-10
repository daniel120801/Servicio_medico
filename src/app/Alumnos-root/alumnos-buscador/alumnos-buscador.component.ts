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
  hasErrorSearch = false;

  constructor(
    private fb: FormBuilder,
    alumnosService: AlumnosService
  ) {
    this.searcher = alumnosService.getSearcher();
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToSearcher();
    this.subscribeToFormChanges();
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      filterSearch: ['nombre', Validators.required],
      searchInput: ['', Validators.required]
    });
  }

  private subscribeToSearcher(): void {
    this.requestSearch = this.searcher.search().subscribe(val => this.handleSearchResult(val));
    this.searcher.setFilter(FilterMode.NOMBRE);
  }

  private subscribeToFormChanges(): void {
    this.searchForm.get('filterSearch')?.valueChanges.subscribe(valor => {
      const newFilterMode = FilterMode[String(valor).toUpperCase() as keyof typeof FilterMode];
      this.searcher.setFilter(newFilterMode);
      this.updateList(true);
    });

    this.searchForm.get('searchInput')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(valor => this.search(valor));
  }

  private handleSearchResult(val: any): void {
    if (Array.isArray(val)) {
      this.filteredAlumnos = val;
      this.hasErrorSearch = false;
    } else if (val && typeof val === 'object' && 'error' in val) {
      this.filteredAlumnos = [];
      this.onFailSearch();
    }
    this.searching = false;
  }

  onFailSearch(): void {
    this.hasErrorSearch = true;
  }

  updateList(force = false): void {
    this.searching = true;
    this.requestSearch?.unsubscribe();
    this.requestSearch = this.searcher.update(force).subscribe(val => this.handleSearchResult(val));
  }

  search(value: string): void {
    this.searching = true;
    this.requestSearch?.unsubscribe();
    this.requestSearch = this.searcher.search(value).subscribe({
      next: val => this.handleSearchResult(val),
      error: () => { this.searching = false; }
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

  getPage(): number {
    return this.searcher.getPage();
  }

  onSelectAlumno(alumno: IAlumnoHeaders): void {
    this.onSelectAlumnoEvent.emit(alumno);
  }

  ngOnDestroy(): void {
    this.requestSearch?.unsubscribe();
  }
}
