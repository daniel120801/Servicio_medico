
import { Injectable } from "@angular/core";
import { Conferencia } from "../Models/conferencia.model";

@Injectable()
export class filterConferenciasUtility {
    private conferencias: Conferencia[] = [];
    constructor() { }

    setConferencias(conferencias: Conferencia[]): void {
        if (!conferencias || conferencias.length === 0) {
            console.warn('No se pueden establecer conferencias: la lista está vacía o es nula');
            return;
        }
        

        this.conferencias = conferencias;
    }
    public fillFilter(): Conferencia[] {
        return this.conferencias;
    }
    public filterConferencias(text: string): Conferencia[] {
        
        
        //TODO: arreglar filtro
        if (!this.conferencias || this.conferencias.length === 0) {
            console.warn('No hay conferencias para filtrar o texto de búsqueda vacío');
            return [];
        }
        if (!text.trim()) {
            console.warn('Texto de búsqueda vacío o solo espacios');
            return this.fillFilter();
        }
        // 2. Normalizar el texto de búsqueda una sola vez
        const searchText = text.toLowerCase();
        

        // 3. Filtrado con switch más claro
        return this.conferencias.filter((conferencia: Conferencia) => {
            return conferencia.nombre.toLowerCase().includes(searchText);
        });
    }

}




