import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno, IAlumnoHeaders } from '../models/alumno.model';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Conferencia } from '../../core/Models/conferencia.model';

@Injectable()
export class AlumnosService {

  private apiUrl = 'https://dandi1333.great-site.net/Estadias/Alumnos';

  private _routesObserver = new BehaviorSubject<ParentPages>(ParentPages.BUSCADOR);
  public routesObserver$: Observable<ParentPages> = this._routesObserver.asObservable();

  private idSubject = new BehaviorSubject<number>(-1);
  public alumnoSelectedObserver$: Observable<Alumno | null> = new Observable();
  alumnosHeaders: IAlumnoHeaders[] = [];

  constructor(private http: HttpClient) {
    this.alumnoSelectedObserver$ = this.idSubject.pipe(
      switchMap(id => {
        if (!id) return of(null); // Manejar caso donde id es null/inválido
        return this.http.get<Alumno>(this.apiUrl + '?id=' + id);
      })
    );
  }
  // Método para cambiar el id
  selectAlumno(nuevoId: number) {
    this.idSubject.next(nuevoId); // Actualiza el id y dispara una nueva petición HTTP
  }

  getAlumnosHeaders(): IAlumnoHeaders[] {
    if (this.alumnosHeaders.length > 0) {
      console.log('Alumnos ya obtenidos, retornando cache.');
      return this.alumnosHeaders;
    }


    this.http.get(this.apiUrl + '?allheaders=').subscribe(
      {
        next: (response) => {

          this.alumnosHeaders = <IAlumnoHeaders[]>response;
          console.log('Alumnos obtenidos:', this.alumnosHeaders);
        },
        error: (error) => {
          console.error('Error al obtener alumnos:', error);

          //TODO: quitar los items de prueba una vez funcione el api
          this.alumnosHeaders.push(new Alumno({
            headers: {
              id: 1,
              nombre: 'Error 1',
              matricula: '23005001',
              carrera: 'Carrera 1'
            }
          }));
          this.alumnosHeaders.push(new Alumno({
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
    return this.alumnosHeaders;
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


