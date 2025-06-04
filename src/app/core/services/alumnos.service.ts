
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno, IAlumnoHeaders } from '../Models/alumno.model';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Conferencia } from '../Models/conferencia.model';
import { Vacunas } from '../Models/vacunas.model';
import { API_ALUMNOS } from '../Utilities/Api';

@Injectable()
export class AlumnosService {
  private _routesObserver = new BehaviorSubject<ParentPages>(ParentPages.BUSCADOR);
  public routesObserver$ = this._routesObserver.asObservable();

  private idSubject = new BehaviorSubject<number>(-1);
  public alumnoSelectedObserver$: Observable<Alumno | null>;

  alumnosHeaders: IAlumnoHeaders[] = [];

  constructor(private http: HttpClient) {
    this.alumnoSelectedObserver$ = this.idSubject.pipe(
      switchMap(id => {
        if (!id || id <= 0) {
          return of(null);
        }
        return this.http.get<Alumno>(`${API_ALUMNOS}?id=${id}`).pipe(
          map((response: any) => {
            if (!response?.id) return null;

            const conferencias: Conferencia[] = (response.conferencias ?? [])
              .flat()
              .map((element: any) => new Conferencia(
                element.id, element.nombre, element.fecha,
                element.hora, element.descripcion, element.presentador
              ));

            const vacunas: Vacunas[] = (response.vacunas ?? [])
              .flat()
              .map((element: any) => new Vacunas(
                element.id, element.nombre, element.fecha
              ));

            return new Alumno({
              general: {
                id: response.id,
                nombre: response.nombre,
                matricula: response.matricula,
                telefono: response.telefono,
                correo: response.correo,
                CURP: response.CURP,
                edad: response.edad,
                carrera: response.carrera,
                ciudad: response.ciudad,
                domicilio: response.domicilio,
                conferenciasAsistidas: conferencias
              },
              medical: {
                NSS: response.NSS,
                afiliacion: response.afiliacion,
                RH: response.RH,
                donador: response.donador,
                peso: response.peso,
                talla: response.talla,
                alergias: response.alergias,
                enfermedades: response.enfermedades,
                tratamientos: response.tratamientos,
                discapacidad: response.discapacidad,
                enCasoDeAccidente: response.enCasoDeAccidente,
                vacunas: vacunas
              }
            });
          }),
          catchError(() => of(null))
        );
      }),
      catchError(() => of(null))
    );
  }

  selectAlumno(nuevoId: number) {
    this.idSubject.next(nuevoId);
  }

  getHeaders(): Observable<IAlumnoHeaders[]> {
    if (this.alumnosHeaders.length > 0) {
      return of(this.alumnosHeaders);
    }
    return this.http.get<any[]>(`${API_ALUMNOS}?allheaders=`).pipe(
      map(objects => {
        if (!Array.isArray(objects)) return [];
        return objects
          .filter(obj => obj?.id && obj?.nombre && obj?.matricula && obj?.carrera)
          .map(obj => new Alumno({
            general: {
              id: obj.id,
              nombre: obj.nombre,
              matricula: obj.matricula,
              carrera: obj.carrera
            }
          }));
      }),
      tap(headers => { this.alumnosHeaders = headers; }),
      catchError(() => of([]))
    );
  }

  toSearch() { this._routesObserver.next(ParentPages.BUSCADOR); }
  toPerfil() { this._routesObserver.next(ParentPages.PERFIL); }
  toConferAsistidas() { this._routesObserver.next(ParentPages.CONFER_ASISTIDAS); }
  toSegMedico() { this._routesObserver.next(ParentPages.SEG_MEDICO); }
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
