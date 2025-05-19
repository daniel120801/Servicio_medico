import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conferencia } from './app/conferencias/Models/conferencia.model';
import { Observable } from 'rxjs';

@Injectable()
export class ConferenciaServiceService {
  //TODO: Cambiar la URL por la de tu API
  private apiUrl = 'https://dandi1333.great-site.net/Estadias';


  constructor(private http: HttpClient) { }

  getConferencias():Observable<Conferencia[]> {
    return this.http.get<Conferencia[]>(this.apiUrl + '?all');
  }

  addConferencia(conferencia: Conferencia) {
    return this.http.post(this.apiUrl, conferencia);
  }


}
