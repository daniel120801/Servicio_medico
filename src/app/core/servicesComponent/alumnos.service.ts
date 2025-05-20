import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Alumno } from '../Models/alumno.model';

@Injectable()
export class AlumnosServiceService {
  private apiUrl = 'https://dandi1333.great-site.net/Estadias/Alumnos';
  constructor(private http: HttpClient) { }
  alumnos2: any = [];

  headers = class Headers {
    
    alumnos: Alumno[] = [];

    constructor(private parent: AlumnosServiceService) {

    }
    public getAlumnosHeaders() {
      this.parent.http.get(this.parent.apiUrl + '?allheaders=').subscribe(
        {
          next: (response) => {
            this.alumnos = <Alumno[]>response;
            console.log('Alumnos obtenidos:', this.alumnos);
          },
          error: (error) => {
            console.error('Error al obtener alumnos:', error);
            this.alumnos.push(new Alumno(
              1,
              'Error 3'
            ));
            this.alumnos.push(new Alumno(
              2,
              'Error 4'
            ));
          }
        }
      );
      console.log('instancia' + typeof this.alumnos);

      return this.alumnos
    }
    public filterAlumnosByText(text: string): Alumno[] | [] {

      if (this.alumnos) {

        const filtro = this.alumnos.filter((alumno: Alumno) => {
          return alumno.nombre.toLowerCase().includes(text.toLowerCase());
        });
        return filtro

      }
      return [];

    }

  }

  /*
  getAlumnosById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.apiUrl + '?alumno=' + id);
  }*/




}
