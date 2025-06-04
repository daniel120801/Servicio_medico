import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno, IAlumnoHeaders } from '../Models/alumno.model';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Conferencia } from '../Models/conferencia.model';
import { Vacunas } from '../Models/vacunas.model';

@Injectable()
export class AlumnosService {

  private apiUrl = 'http://localhost/Estadia/API/alumnos.php';

  private _routesObserver = new BehaviorSubject<ParentPages>(ParentPages.BUSCADOR);
  public routesObserver$: Observable<ParentPages> = this._routesObserver.asObservable();

  private idSubject = new BehaviorSubject<number>(-1);
  public alumnoSelectedObserver$: Observable<Alumno | null> = new Observable();
  alumnosHeaders: IAlumnoHeaders[] = [];

  constructor(private http: HttpClient) {
    this.alumnoSelectedObserver$ = this.idSubject.pipe(
      switchMap(id => {
        if (!id || id <= 0) {
          console.log('ID no válido, retornando null');
          return of(null);
        }
    

        return this.http.get<Alumno>(this.apiUrl + '?id=' + id).pipe(

          map((response: any) => {
            if (!response || !response.id) {
              console.warn('Respuesta inválida del servidor:', response);
              return null;
            }

            let conferencias: Conferencia[] = [];



            if (response.conferencias && Array.isArray(response.conferencias)) {

              response.conferencias.forEach((item: any) => {
                item.forEach((element: any) => {
                  conferencias.push(
                    new Conferencia(
                      element.id,
                      element.nombre,
                      element.fecha,
                      element.hora,
                      element.descripcion,
                      element.presentador
                    )
                  );
                })
              });
            } else {
              conferencias = [];
            }

            let vacunas: Vacunas[] = [];
            if (response.vacunas && Array.isArray(response.vacunas)) {
             
              response.vacunas.forEach((item: any) => {
                item.forEach((element: any) => {
                  vacunas.push(
                    new Vacunas(
                      element.id,
                      element.nombre,
                      element.fecha
                    )
                  );
                })
              });

            } else {
              vacunas = [];
            }

            const alumno = new Alumno(
              {
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
                  domicilio: response.domicilio
                  ,
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
            return alumno;
          }));
      }),
      catchError(error => {
        console.error('Error en la petición:', error);
        return of(null);
      }));
  }
  // Método para cambiar el id
  selectAlumno(nuevoId: number) {
    this.idSubject.next(nuevoId); // Actualiza el id y dispara una nueva petición HTTP
  }

  getHeaders(): Observable<IAlumnoHeaders[]> {
    if (this.alumnosHeaders.length > 0) {
      console.log('Alumnos ya obtenidos, retornando cache.');
      return of(this.alumnosHeaders);
    }

    return this.http.get<IAlumnoHeaders[]>(this.apiUrl + '?allheaders=').pipe(
      map((objects: any[]) => {
        // Mapear cada objeto a IAlumnoHeaders

        if (!objects || !Array.isArray(objects)) {
          console.warn('Respuesta inválida del servidor:', objects);
          return [];
        }
        let headers: IAlumnoHeaders[] = [];
        if (objects.length === 0) {
          console.warn('No se encontraron alumnos en la respuesta del servidor.');
          return headers;
        }
        objects.forEach(obj => {
          if (obj && obj.id && obj.nombre && obj.matricula && obj.carrera) {
            headers.push(
              new Alumno({
                general: {
                  id: obj.id,
                  nombre: obj.nombre,
                  matricula: obj.matricula,
                  carrera: obj.carrera
                }
              }));
          } else {
            console.warn('Objeto inválido en la respuesta del servidor:', obj);
          }
        });

        return headers;

      }),
      tap(headers => {
        // Almacenar en cache
        this.alumnosHeaders = headers;
      })
    );

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


