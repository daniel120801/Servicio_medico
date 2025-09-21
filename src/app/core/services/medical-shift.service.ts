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
  createNewMedicalShift(name: string): Observable<medicalShift> {

    var date = new Date();
    var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const formD: FormData = new FormData();
    formD.append('name', name)
    formD.append('date', dateStr)

    return this.http.post<any>(API_MEDICALSHIFT + "?create", formD)
      .pipe(
        tap((response) => console.log(response)),
        map(response => {
          return new medicalShift(response.data.id,
            response.data.name,
            response.data.access_code,
            response.data.date,
            [],
            response.data.filesCount,
            response.data.state
          );
        })
      );
  }
  getFormsHeader($accessCode: string) {
    return this.http.get<any>(API_MEDICALSHIFT + "?labels&access_code=" + $accessCode)
      .pipe(
        tap(console.log), map(response => response.data)
      );
  }
  getFormData($accessCode: string, name: string): Observable<any> {
    return this.http.get<any>(API_MEDICALSHIFT + "?getForm&access_code=" + $accessCode + "&nameFile=" + name)
      .pipe(
        tap(console.log), map(response => response.data)
      );
  }
  updateState(id: number): Observable<boolean> {
    return this.http.get<any>(API_MEDICALSHIFT + "?updateState=&id=" + id).pipe(
      map(response => response.status == 'success')
    )
  }
}
