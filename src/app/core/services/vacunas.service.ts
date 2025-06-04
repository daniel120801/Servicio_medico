import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacunas } from '../Models/vacunas.model';
import { Observable } from 'rxjs';

export interface Vacuna {
  id: number;
  nombre: string;
}

@Injectable()
export class VacunasService {
  //TODO: Cambiar la URL por la de tu API
  private apiUrl = 'https://dandi1333.great-site.net/Estadias/vacunas';

  constructor(private http: HttpClient) { }

  getVacunas(): Observable<Vacuna[]> {
    return this.http.get<Vacuna[]>(this.apiUrl);
  }

  agregarVacuna(vacuna: Partial<Vacuna>): Observable<Vacuna> {
    return this.http.post<Vacuna>(this.apiUrl, vacuna);
  }
}