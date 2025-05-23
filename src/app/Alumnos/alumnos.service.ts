import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnoHeaders } from '../core/Models/alumnoHeaders.model';
import { Alumno } from '../core/Models/alumno.model';
import { alumnoTest1 } from '../Tests/Alumno-tests';
import { Observable } from 'rxjs';

@Injectable()
export class AlumnosService {

  private apiUrl = 'https://dandi1333.great-site.net/Estadias/Alumnos';
  constructor(private http: HttpClient) { }

  essentials = class Essentials {

    alumnos: AlumnoHeaders[] = [];

    constructor(private parent: AlumnosService) {

    }
    public getAlumnosHeaders() {
      this.parent.http.get(this.parent.apiUrl + '?allheaders=').subscribe(
        {
          next: (response) => {
            this.alumnos = <AlumnoHeaders[]>response;
            console.log('Alumnos obtenidos:', this.alumnos);
          },
          error: (error) => {
            console.error('Error al obtener alumnos:', error);
            //TODO: quitar los items de prueba una vez funcione el api
            this.alumnos.push(new AlumnoHeaders(
              1,
              'Error 3',
              '23005048',
              'Carrera 1'
            ));
            this.alumnos.push(new AlumnoHeaders(
              2,
              'Error 4',
              '23005102',
              'Carrera 2'
            ));
            //*-----------------------
          }
        }
      );

      return this.alumnos
    }

    public fillFilter(): AlumnoHeaders[] {
      return this.alumnos;
    }

    public filterAlumnos(text: string, filterMode: FilterMode): AlumnoHeaders[] {
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
      return this.alumnos.filter((alumno: AlumnoHeaders) => {
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
  generals = class Generals {
    alumno: Alumno | null = null;
    constructor(private parent: AlumnosService) {

    }
    getAlumno(id: number): Observable<Alumno> { 

     return this.parent.http.get<Alumno>(this.parent.apiUrl + '?id=' + id);
    }

  }
}
export enum FilterMode {
  NOMBRE,
  MATRICULA,
  CARRERA
}





