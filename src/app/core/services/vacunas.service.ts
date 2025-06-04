import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacunas } from '../Models/vacunas.model';
import { Observable } from 'rxjs';

@Injectable()
export class VacunasService {
  //TODO: Cambiar la URL por la de tu API
  private apiUrl = 'https://dandi1333.great-site.net/Estadias/vacunas';

  constructor(private http: HttpClient) { }

  getVacunas():Observable<Vacunas[]> {
    return this.http.get<Vacunas[]>(this.apiUrl + '?all=');
  }


}
