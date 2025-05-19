import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conferencia } from './app/conferencias/Models/conferencia.model';

@Injectable()
export class ConferenciaServiceService {
  private apiUrl = 'https://api.example.com/conferencias';

  
  constructor(private http: HttpClient) { }
  getConferencias() {
    return this.http.get<Conferencia[]>(this.apiUrl);
  }

  addConferencia(conferencia: Conferencia) {
    return this.http.post(this.apiUrl, conferencia);
  }


}
