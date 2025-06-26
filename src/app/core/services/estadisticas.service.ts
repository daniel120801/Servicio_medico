import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFERENCIAS, API_VACUNAS } from '../Utilities/Api';

@Injectable({ providedIn: 'root' })
export class EstadisticasService {
  constructor(private http: HttpClient) {}

getConsultas() {
  return this.http.get<{id: number, nombre: string, fecha: string, diagnostico: string}[]>(API_VACUNAS + '?all_consulta');
}


getAsistentesPorConferencia(id: number) {
  return this.http.get<{ total: number }>(API_CONFERENCIAS + `?accion=asistentesConferencia&id=${id}`);
}
}