import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacunas } from '../Models/vacunas.model';
import { Observable } from 'rxjs';
import { API_VACUNAS } from '../Utilities/Api';



@Injectable()
export class VacunasService {
  constructor(private http: HttpClient) { }

  getVacunas(): Observable<Vacunas[]> {
    return this.http.get<Vacunas[]>(API_VACUNAS);
  }

  agregarVacuna(vacuna: Partial<Vacunas>): Observable<Vacunas> {
    return this.http.post<Vacunas>(API_VACUNAS, vacuna);
  }
}