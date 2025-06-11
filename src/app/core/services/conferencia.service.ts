import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conferencia } from '../Models/conferencia.model';
import { Observable } from 'rxjs';
import { API_CONFERENCIAS } from '../Utilities/Api';

@Injectable()
export class ConferenciaServiceService {
  constructor(private http: HttpClient) { }

  getConferencias():Observable<Conferencia[]> {
    return this.http.get<Conferencia[]>(API_CONFERENCIAS + '?todo');
  }

addConferencia(conferencia: Conferencia) {
  
  const body = {
    ...conferencia,
    accion: 'registrarConferencia'
  };
  return this.http.post(API_CONFERENCIAS, body);
}

 

}



