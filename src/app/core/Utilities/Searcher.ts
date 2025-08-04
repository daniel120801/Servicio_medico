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
/**
 * Clase `Searcher` para gestionar la búsqueda y paginación de alumnos.
 * 
 * Esta clase proporciona métodos para buscar, filtrar y paginar resultados de alumnos
 * utilizando peticiones HTTP. Permite seleccionar el tipo de filtro, navegar entre páginas
 * y actualizar los resultados de la búsqueda.
 * 
 * @remarks
 * - Utiliza `HttpClient` para realizar peticiones POST al backend.
 * - Los filtros disponibles se definen en el enum `FilterMode`.
 * - Los resultados se mapean a instancias de la clase `Alumno`.
 * 
 * @example
 * ```typescript
 * const searcher = new Searcher(httpClient);
 * searcher.setFilter(FilterMode.NOMBRE);
 * searcher.search('Juan').subscribe(result => { ... });
 * ```
 * 
 * @property pag - Índice de la página actual.
 * @property rowsForPage - Número de filas por página.
 * @property totalRows - Número total de filas encontradas (-1 si no se ha buscado).
 * @property filter - Filtro actual aplicado a la búsqueda.
 * @property lastValue - Último valor de búsqueda utilizado.
 * 
 * @method setFilter - Cambia el filtro de búsqueda.
 * @method getPage - Obtiene el índice de la página actual.
 * @method prevPage - Retrocede a la página anterior.
 * @method nextPage - Avanza a la siguiente página.
 * @method setPage - Establece el índice de la página actual.
 * @method search - Realiza una búsqueda con el valor especificado y retorna los resultados.
 * @method update - Actualiza los resultados de la búsqueda usando el último valor o fuerza la actualización.
 * 
 * @param http - Instancia de `HttpClient` para realizar peticiones HTTP.
 */
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

    
        body.append('field', m);
        body.append('value', value)
        body.append('pag', this.pag.toString());

        return this.http.post<Response>(`${API_ALUMNOS}?search=`, body).pipe(

            map(response => {
                if (!response || !Array.isArray(response.data)) {

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

