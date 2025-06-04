import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conferencia } from '../Models/conferencia.model';
import { Observable } from 'rxjs';
import { API_CONFERENCIAS } from '../Utilities/Api';

@Injectable()
export class ConferenciaServiceService {
  constructor(private http: HttpClient) { }

  getConferencias():Observable<Conferencia[]> {
    return this.http.get<Conferencia[]>(API_CONFERENCIAS + '?all=');
  }

  addConferencia(conferencia: Conferencia) {
    return this.http.post(API_CONFERENCIAS, conferencia);
  }

  updateConferencia(conferencia: Conferencia) {
    return this.http.put(API_CONFERENCIAS + '?update=' + conferencia.id, conferencia);
  }

}
