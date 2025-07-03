import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from '../../core/services/alumnos.service';
import { IAlumnoHeaders } from '../../core/Models/alumno.model';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { Searcher, FilterMode } from '../../core/Utilities/Searcher';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-alumnos',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './alumnos-buscador.component.html',
  styleUrls: ['./alumnos-buscador.component.css']
})
export class AlumnosComponent implements OnInit, OnDestroy {
  @Output() onSelectAlumnoEvent: EventEmitter<IAlumnoHeaders> = new EventEmitter<IAlumnoHeaders>();
  searchForm: FormGroup;
  opcionSeleccionada: any;
  filteredAlumnos: IAlumnoHeaders[] = [];
  requestSearch: Subscription | null = null;
  searcher: Searcher;
  searching: boolean = true;

  constructor(
    private fb: FormBuilder,
    alumnosService: AlumnosService) {
    this.searcher = alumnosService.getSearcher();
    this.searchForm = this.fb.group({
      filterSearch: ['nombre', Validators.required],
      searchInput: ['', Validators.required]
    });
  }
  ngOnInit(): void {

    //rellenar con los primeros usuarios
    this.requestSearch = this.searcher.search().subscribe(
      val => {
        this.filteredAlumnos = val;
        this.searcher.setFilter(FilterMode.NOMBRE);
        this.searching = false;
      }
    );
    console.log(this.searcher.getPage());

    this.searchForm.get('filterSearch')?.valueChanges.subscribe(valor => {

      const value = (<string>valor);

      const newFilterMode = FilterMode[value.toUpperCase() as keyof typeof FilterMode];
      this.searcher.setFilter(newFilterMode);
      this.updateList();

    });

    this.searchForm.get('searchInput')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(valor => {
      this.search(valor);
    });

  }
  updateList(force: boolean = false): void {
    this.searching = true;
    if (this.requestSearch) {
      this.requestSearch.unsubscribe();
    }

    this.requestSearch = this.searcher.update(force).subscribe(
      val => {
        console.log(val);
        this.filteredAlumnos = val;
        this.searching = false;
      }

    );

    // this.filteredAlumnos = this.filter.filterAlumnos(valor, this.filterMode)
  }

  search(value: string): void {
    this.searching = true;
    if (this.requestSearch) {
      this.requestSearch.unsubscribe();
    }
    this.requestSearch = this.searcher.search(value).subscribe({
      next: (response) => {
        console.log(response);
        this.filteredAlumnos = response;
        this.searching = false;
      },
      error: (error) => {
        this.searching = false;
      }
    });


    this.requestSearch = this.searcher.search(value).subscribe(
      val => {

      }

    );

  }

  onNextPag() {
    this.searcher.nextPage()
    this.updateList(true);
  }
  onPrevPag() {
    this.searcher.prevPage()
    this.updateList(true);

  }
  hasMorePages() {
    return this.filteredAlumnos.length % 10 == 0
  }
  onSelectAlumno(alumno: IAlumnoHeaders) {
    this.onSelectAlumnoEvent.emit(alumno);
  }
  ngOnDestroy(): void {

  }
}






