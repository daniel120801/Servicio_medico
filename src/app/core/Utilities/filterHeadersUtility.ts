
import { Injectable } from "@angular/core";
import { IAlumnoHeaders } from "../Models/alumno.model";
import { FilterMode } from "../services/alumnos.service";

@Injectable()
export class filterHeadersUtility {
    private alumnos: IAlumnoHeaders[] = [];
    constructor() {}

    setAlumnos(alumnos: IAlumnoHeaders[]): void {
        if (!alumnos || alumnos.length === 0) {
            console.warn('No se pueden establecer alumnos: la lista está vacía o es nula');
            return;
        }
        this.alumnos = alumnos;
    }
    public fillFilter(): IAlumnoHeaders[] {
        return this.alumnos;
    }
    public filterAlumnos(text: string, filterMode: FilterMode): IAlumnoHeaders[] {
        //TODO: arreglar filtro
        // 1. Validación más explícita
        if (!this.alumnos || this.alumnos.length === 0) {
            console.warn('No hay alumnos para filtrar o texto de búsqueda vacío');
            return [];
        }
        if (!text.trim()) {
            console.warn('Texto de búsqueda vacío o solo espacios');
            return this.fillFilter();
        }
        // 2. Normalizar el texto de búsqueda una sola vez
        const searchText = text.toLowerCase();

        // 3. Filtrado con switch más claro
        return this.alumnos.filter((alumno: IAlumnoHeaders) => {
            let fieldToSearch: string;

            switch (filterMode) {
                case FilterMode.MATRICULA:
                    fieldToSearch = alumno.matricula?.toLowerCase() || '';
                    break;
                case FilterMode.CARRERA:
                    fieldToSearch = alumno.carrera?.toLowerCase() || '';
                    break;
                case FilterMode.NOMBRE:
                    fieldToSearch = alumno.nombre?.toLowerCase() || '';
                    break;
                default: // FilterMode.NOMBRE por defecto
                    fieldToSearch = alumno.nombre?.toLowerCase() || '';
            }
            

            return fieldToSearch.includes(searchText);
        });
    }

}




