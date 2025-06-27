
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno, IAlumnoHeaders } from '../Models/alumno.model';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Conferencia } from '../Models/conferencia.model';
import { Vacunas } from '../Models/vacunas.model';
import { API_ALUMNOS } from '../Utilities/Api';
import { Documento } from '../Models/Documento.model';

export class Response {
  public status: string = '';
  public message: string = '';
  public data: [] = [];

}

@Injectable()
export class AlumnosService {


  //#region variables
  private _routesObserver = new BehaviorSubject<ParentPages>(ParentPages.BUSCADOR);
  public routesObserver$ = this._routesObserver.asObservable();

  private idSubject = new BehaviorSubject<string>('');
  public alumnoSelectedObserver$: Observable<Alumno | null>;
  alumnosHeaders: IAlumnoHeaders[] = [];
  //#endregion
  constructor(private http: HttpClient) {
    this.alumnoSelectedObserver$ = this.idSubject.pipe(
      switchMap(mtr => {
        if (!mtr || mtr === null) {


          return of(null);
        }
        return this.http.get<Alumno>(`${API_ALUMNOS}?mtr=${mtr}`).pipe(
          map((response: any) => {


            if (!response?.matricula) return null;

            return this.buildAlumno(response);

          })
        );
      }),
      catchError(() => of(null))
    );
  }
  selectAlumno(nuevoId: string) {
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
          .filter(obj => obj?.nombre && obj?.matricula && obj?.carrera)
          .map(obj => new Alumno({
            general: {
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
  getFile(fileName: string, mtr: string): Observable<any> {

    const formD: FormData = new FormData();
    formD.append('mtr', mtr + '')
    formD.append('fileName', fileName + '')



    return this.http.post(`${API_ALUMNOS}?gFile=true`, formD, { responseType: 'blob' }).pipe(
      catchError(error => {
        console.error('Error al descargar el archivo:', error);
        return of(null);
      })
    );
  }
  /**
 * send a document to server 
 *
 * @param form the formData with the name, document as blob and matricula of student
 *
 * @return An `Observable` of the response, with the response body as an `json`.
 */
  uploadDocument(form: FormData): Observable<any> {
    return this.http.post(`${API_ALUMNOS}?uploadFile=true`, form);
  }
  buildAlumno(response: any): Alumno {
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

    const documentos: Documento[] = (response.documentos ?? [])
      .flat()
      .map((element: any) => new Documento(
        element.id, element.nombre
      ));

    const alumno = new Alumno({
      general: {
        nombre: response.nombre,
        matricula: response.matricula,
        telefono: response.telefono,
        correo: response.correo,
        genero: response.genero,
        CURP: response.CURP,
        edad: response.edad,
        carrera: response.carrera,
        ciudad: response.ciudad,
        domicilio: response.domicilio,
        conferenciasAsistidas: conferencias,
        documentos: documentos
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
  }

  modifyStat(mtr: string, field: string, newValue: string): Observable<boolean> {

    const body = new FormData();
    body.append('field', field);
    body.append('mtr', mtr);
    body.append('value', newValue);
    return this.http.post<any>(API_ALUMNOS + '?modStat=', body).pipe(
      map(response => {
        if (!response || response.status !== 'success') {
          return false;
        }
        else {

          return true;
        }
      }),
      catchError(error => {
        console.error('Error al modificar el stat:', error);
        return of(false);
      }
      )
    )
  }
  modifyAllStats(mtr: string, body: FormData): Observable<Response> {
    body.append('mtr', mtr);
    return this.http.post<Response>(API_ALUMNOS + '?modAllStats', body).pipe(
      catchError(error => {
        console.error('Error al modificar el stat:', error);
        return of(new Response());
      })
    );
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
  SEG_MEDICO = 'seg_medico',
  FORM_SEG_MED = 'form_seg_med'
}
