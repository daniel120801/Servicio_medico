import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../Models/consultas.model';
import { Observable } from 'rxjs';
import { API_CONSULTAS } from '../Utilities/Api';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  constructor(private http: HttpClient) {}

  // Obtener todas las consultas
  getConsultas(): Observable<Consulta[]> {
    // Puedes crear un endpoint específico o usar un parámetro de acción
    return this.http.get<Consulta[]>(API_CONSULTAS + '?all_consulta');
  }

  actualizarConsulta(consulta: Partial<Consulta>): Observable<any> {
    return this.http.post(API_CONSULTAS, {
      accion: 'editarConsulta',
      ...consulta
    });
  }

  // Agregar una nueva consulta
  agregarConsulta(consulta: Partial<Consulta>): Observable<any> {
    return this.http.post(API_CONSULTAS, {
      accion: 'insertarConsulta',
      ...consulta
    });
  } 
}