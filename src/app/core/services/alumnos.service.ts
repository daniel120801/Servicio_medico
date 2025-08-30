
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno, IAlumnoHeaders } from '../Models/alumno.model';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Conferencia } from '../Models/conferencia.model';
import { Vacunas } from '../Models/vacunas.model';
import { API_ALUMNOS } from '../Utilities/Api';
import { Documento } from '../Models/Documento.model';
import { Searcher } from '../Utilities/Searcher';

export class Response {
  public status: string = '';
  public message: string = '';
  public data: [] = [];

}

/**
 * Servicio para gestionar la información de los alumnos.
 * Proporciona métodos para seleccionar alumnos, obtener encabezados, buscar alumnos,
 * descargar y subir documentos, construir instancias de Alumno y modificar estadísticas.
 *
 * @remarks
 * Utiliza observables para manejar la selección de alumnos y la obtención de datos desde el servidor.
 * Implementa manejo de errores para las operaciones HTTP.
 *
 * @example
 * ```typescript
 * alumnosService.selectAlumno('123456');
 * alumnosService.getHeaders().subscribe(headers => { ... });
 * alumnosService.uploadDocument(formData).subscribe(response => { ... });
 * ```
 */

/**
 * Servicio para la gestión de alumnos en la aplicación.
 * Proporciona métodos para seleccionar alumnos, obtener información general,
 * descargar y subir documentos, y modificar datos médicos y generales.
 *
 * @remarks
 * Utiliza observables para la reactividad y comunicación entre componentes.
 *
 * @method selectAlumno
 * Selecciona un alumno por su matrícula.
 * @param nuevoId - Matrícula del alumno a seleccionar.
 *
 * @method getHeaders
 * Obtiene los encabezados generales de todos los alumnos.
 * @returns Observable con un arreglo de encabezados de alumnos.
 *
 * @method getSearcher
 * Retorna una instancia de Searcher para realizar búsquedas de alumnos.
 * @returns Instancia de Searcher.
 *
 * @method getFile
 * Descarga un archivo asociado a un alumno.
 * @param fileName - Nombre del archivo a descargar.
 * @param mtr - Matrícula del alumno.
 * @returns Observable con el archivo en formato blob.
 *
 * @method uploadDocument
 * Sube un documento al servidor para un alumno.
 * @param form - FormData con el documento y datos del alumno.
 * @returns Observable con la respuesta del servidor.
 *
 * @method buildAlumno
 * Construye una instancia de Alumno a partir de la respuesta del servidor.
 * @param response - Objeto con los datos del alumno.
 * @returns Instancia de Alumno.
 *
 * @method modifyStat
 * Modifica un campo específico del estado médico de un alumno.
 * @param mtr - Matrícula del alumno.
 * @param field - Campo a modificar.
 * @param newValue - Nuevo valor para el campo.
 * @returns Observable que indica si la modificación fue exitosa.
 *
 * @method modifyAllStats
 * Modifica múltiples campos del estado médico de un alumno.
 * @param mtr - Matrícula del alumno.
 * @param body - FormData con los campos a modificar.
 * @returns Observable con la respuesta del servidor.
 */
@Injectable()
export class AlumnosService {


  //#region variables
  private _routesObserver = new BehaviorSubject<ParentPages>(ParentPages.BUSCADOR);
  public routesObserver$ = this._routesObserver.asObservable();

  private idSubject = new BehaviorSubject<string>('');
  public alumnoSelectedObserver$: Observable<Alumno | null>;
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
      catchError(() => of([]))
    );
  }
  getSearcher() {
    return new Searcher(this.http);
  }

  getFile(fileName: string, mtr: string): Observable<any> {

    const formD: FormData = new FormData();
    formD.append('mtr', mtr + '')
    formD.append('fileName', fileName + '')



    return this.http.post(`${API_ALUMNOS}?gFile=`, formD, { responseType: 'blob' }).pipe(

      catchError(error => {
        console.error('Error al descargar el archivo:', error);
        return of(null);
      })
    );
  }
  removeFile(fileId: number, mtr: string): Observable<any> {
    const formD: FormData = new FormData();
    formD.append('mtr', mtr + '')
    formD.append('id_file', fileId + '')
    return this.http.post(`${API_ALUMNOS}?rmfile=`, formD).pipe(

      catchError(error => {
        console.error('Error al eliminar el archivo:', error);
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

export enum ParentPages {
  BUSCADOR = 'buscador',
  PERFIL = 'perfil',
  CONFER_ASISTIDAS = 'confer_asistidas',
  SEG_MEDICO = 'seg_medico',
  FORM_SEG_MED = 'form_seg_med'
}
