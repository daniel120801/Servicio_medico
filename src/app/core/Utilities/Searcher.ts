import { HttpClient } from "@angular/common/http";
import { API_ALUMNOS } from "./Api";
import { catchError, map, Observable, of, tap } from "rxjs";
import { Alumno, IAlumnoHeaders } from "../Models/alumno.model";

export class Response {
    public status: string = '';
    public message: string = '';
    public data: [] = [];

}
export enum FilterMode {
    ALL = "ALL",
    NOMBRE = "NOMBRE",
    MATRICULA = "MATRICULA",
    CARRERA = "CARRERA"
}
export class Searcher {

    pag: number = 0
    rowsForPage: number = 10;
    totalRows: number = -1;
    filter: FilterMode = FilterMode.NOMBRE;
    lastValue: string = '';


    constructor(private http: HttpClient) { }
    setFilter(newFilter: FilterMode) {
        this.filter = newFilter;
    }
    getPage() {
        return this.pag;
    }
    prevPage() {
        this.pag -= this.rowsForPage;
        this.pag = this.pag < 0 ? 0 : this.pag;
    }
    nextPage() {
        this.pag += this.rowsForPage;
    }
    setPage(index: number) {
        this.pag = index;
    }
    search(value: string = ''): Observable<| { error: boolean } | IAlumnoHeaders[]> {




        this.pag = 0


        let m = 'all';
        if (value !== '') {
            switch (this.filter) {
                case FilterMode.CARRERA:
                    m = 'c';
                    break;
                case FilterMode.MATRICULA:
                    m = 'mtr';
                    break;
                case FilterMode.NOMBRE:
                    m = 'n';
                    break;
            }
        }
        this.lastValue = value;
        let body: FormData = new FormData()

        console.log('search called with:', {
            value,
            pag: this.pag,
            sizePag: this.rowsForPage,
            sizeFile: this.totalRows,
            filter: this.filter.toString(),
            lastValue: this.lastValue,
            m: m
        });
        body.append('field', m);
        body.append('value', value)
        body.append('pag', this.pag.toString());

        return this.http.post<Response>(`${API_ALUMNOS}?search=`, body).pipe(

            map(response => {
                if (!response || !Array.isArray(response.data)) {
                    console.log('no data');

                    return [];
                }
                this.totalRows = response.data.length

                return (response.data as any[]).map(obj => new Alumno({
                    general: {
                        matricula: obj.matricula || '',
                        nombre: obj.nombre || '',
                        carrera: obj.carrera || ''
                    }
                }));
            }),
            catchError(() => of({ error: true }))
        );
    }
    update(forceUpdate: boolean = false): Observable<IAlumnoHeaders[] | { error: boolean }> {

        if (this.lastValue === '' && !forceUpdate) {
            console.log('last value ');
            return of();
        }

        let m = 'all';
        if (this.lastValue !== '') {
            switch (this.filter) {
                case FilterMode.CARRERA:
                    m = 'c';
                    break;
                case FilterMode.MATRICULA:
                    m = 'mtr';
                    break;
                case FilterMode.NOMBRE:
                    m = 'n';
                    break;
            }
        }

        let body: FormData = new FormData();

        body.append('field', m);
        body.append('value', this.lastValue);
        body.append('pag', this.pag.toString());
        return this.http.post<Response>(`${API_ALUMNOS}?search=`, body).pipe(
            map(response => {
                if (!response || !Array.isArray(response.data)) {
                    console.log('no data');
                    return { error: true };
                }
                return (response.data as any[]).map(obj => new Alumno({
                    general: {
                        matricula: obj.matricula || '',
                        nombre: obj.nombre || '',
                        carrera: obj.carrera || ''
                    }
                }));
            }),
            catchError(() => of({ error: true }))
        );
    }
}

