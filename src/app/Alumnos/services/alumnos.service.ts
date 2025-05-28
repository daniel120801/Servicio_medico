import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno, IAlumnoHeaders } from '../models/alumno.model';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class AlumnosService {

  private apiUrl = 'https://dandi1333.great-site.net/Estadias/Alumnos';

  private _routesObserver = new BehaviorSubject<ParentPages>(ParentPages.BUSCADOR);
  public routesObserver$: Observable<ParentPages> = this._routesObserver.asObservable();

  private idSubject = new BehaviorSubject<number>(-1);
  public alumnoSelectedObserver$: Observable<Alumno | null> = new Observable();
  alumnos: IAlumnoHeaders[] = [];
  


  constructor(private http: HttpClient) {
    this.alumnoSelectedObserver$ = this.idSubject.pipe(
      switchMap(id => {
        if (!id) return of(null); // Manejar caso donde id es null/inválido
        return this.http.get<Alumno>(this.apiUrl + '?id=' + id);
      })
    );
  }
  // Método para cambiar el id
  cambiarId(nuevoId: number) {
    this.idSubject.next(nuevoId); // Actualiza el id y dispara una nueva petición HTTP
  }

  getAlumnosHeaders(): IAlumnoHeaders[] {
    this.http.get(this.apiUrl + '?allheaders=').subscribe(
      {
        next: (response) => {
          this.alumnos = <IAlumnoHeaders[]>response;
          console.log('Alumnos obtenidos:', this.alumnos);
        },
        error: (error) => {
          console.error('Error al obtener alumnos:', error);
          //TODO: quitar los items de prueba una vez funcione el api
          this.alumnos.push(new Alumno({
            headers: {
              id: 1,
              nombre: 'Error 1',
              matricula: '23005001',
              carrera: 'Carrera 1'
            }
          }));
          this.alumnos.push(new Alumno({
            headers: {
              id: 2,
              nombre: 'Error 2',
              matricula: '23005002',
              carrera: 'Carrera 2'
            }
          }));
          //*-----------------------
        }
      }
    );

    return this.alumnos

  }





  toSearch() {
    this._routesObserver.next(ParentPages.BUSCADOR);

  }
  toPerfil() {
    this._routesObserver.next(ParentPages.PERFIL);
  }
  toConferAsistidas() {
    this._routesObserver.next(ParentPages.CONFER_ASISTIDAS);
  }
  toSegMedico() {
    this._routesObserver.next(ParentPages.SEG_MEDICO);
  }
}

export class filterUtility {

  constructor(private alumnos: IAlumnoHeaders[]) {

  }
  public fillFilter(): IAlumnoHeaders[] {
    return this.alumnos;
  }
  public filterAlumnos(text: string, filterMode: FilterMode): IAlumnoHeaders[] {
    //TODO: arreglar filtro
    // 1. Validación más explícita
    if (!this.alumnos || this.alumnos.length === 0) {
      console.warn('No hay alumnos para filtrar o texto de búsqueda vacío');
      return [];
    }
    if (!text.trim()) {
      console.warn('Texto de búsqueda vacío o solo espacios');
      return this.fillFilter();
    }
    // 2. Normalizar el texto de búsqueda una sola vez
    const searchText = text.toLowerCase();

    // 3. Filtrado con switch más claro
    return this.alumnos.filter((alumno: IAlumnoHeaders) => {
      let fieldToSearch: string;

      switch (filterMode) {
        case FilterMode.MATRICULA:
          fieldToSearch = alumno.matricula?.toLowerCase() || '';
          break;
        case FilterMode.CARRERA:
          fieldToSearch = alumno.carrera?.toLowerCase() || '';
          break;
        case FilterMode.NOMBRE:
          fieldToSearch = alumno.nombre?.toLowerCase() || '';
          break;
        default: // FilterMode.NOMBRE por defecto
          fieldToSearch = alumno.nombre?.toLowerCase() || '';
      }
      console.log("state filter: " + fieldToSearch.includes(searchText));

      return fieldToSearch.includes(searchText);
    });
  }

}

export enum FilterMode {
  NOMBRE,
  MATRICULA,
  CARRERA
}
export enum ParentPages {
  BUSCADOR = 'buscador',
  PERFIL = 'perfil',
  CONFER_ASISTIDAS = 'confer_asistidas',
  SEG_MEDICO = 'seg_medico'
}


