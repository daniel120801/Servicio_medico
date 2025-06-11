import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacunas } from '../Models/vacunas.model';
import { Observable } from 'rxjs';
import { API_VACUNAS } from '../Utilities/Api';

@Injectable()
export class VacunasService {
  constructor(private http: HttpClient) { }

  getVacunas(): Observable<Vacunas[]> {
    return this.http.get<Vacunas[]>(API_VACUNAS + '?all');
  }

  agregarVacuna(vacuna: Partial<Vacunas>): Observable<Vacunas> {
    return this.http.post<Vacunas>(API_VACUNAS, vacuna);
  }

 // ...existing code...
  asociarAlumnoVacuna(estudiante_id: number | string, vacuna_id: number | string) {
    return this.http.post(API_VACUNAS, {
      accion: 'registrarVacunaAlumno', // <-- Cambia aquí
      estudiante_id,
      vacuna_id
    });
  }
// ...existing code...
  obtenerVacunadosPorVacuna(vacuna_id: number | string) {
    return this.http.get<string[]>(`${API_VACUNAS}?accion=alumnosVacunados&vacuna_id=${vacuna_id}`);
  }
// ...existing code...

  estaAlumnoVacunado(estudiante_id: number | string, vacuna_id: number | string): Observable<boolean> {
    return this.http.get<boolean>(
      `${API_VACUNAS}?accion=verificarVacunado&estudiante_id=${estudiante_id}&vacuna_id=${vacuna_id}`
    );
  }
}