import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Alumno } from '../Models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnosServiceService {
  private apiUrl = 'https://dandi1333.great-site.net/Estadias/Alumnos';
  constructor(private http: HttpClient) { }
  alumnos: Observable<Alumno[]> | null = null;

  getAlumnos(): Observable<Alumno[]> {
    this.alumnos = this.http.get<Alumno[]>(this.apiUrl + '?all=');
    return this.alumnos
  }
  getAlumnosById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.apiUrl + '?alumno=' + id);
  }

  filterAlumnosByNombre(nombre: string): Observable<Alumno[]> | undefined {
    if (this.alumnos) {

      const filtro = this.alumnos.pipe(
        filter(alumnos => alumnos.some(alumno => alumno.nombre.toLowerCase().includes(nombre.toLowerCase())))
      )
      return filtro;
    }
    return undefined;
  }

}
