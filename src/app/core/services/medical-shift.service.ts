import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_MEDICALSHIFT } from '../Utilities/Api';
import { IMedicalShift, medicalShift } from '../Models/medicalShift.model';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class MedicalShiftService {

  constructor(private http: HttpClient) { }



  getAllHeaders(): Observable<IMedicalShift[]> {
    return this.http.get<any>(API_MEDICALSHIFT + '?allheaders')
      .pipe(
        tap(console.log),
        map(response => response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          accessCode: item.access_code,
          fecha: item.date,
          filesCount: item.filesCount,
          state: item.state
        })))
      );
  }



}
