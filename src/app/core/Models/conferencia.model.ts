// src/app/conferencias/models/conferencia.model.ts

import { Time } from "@angular/common";

export interface IConferencia {
    id: string | number;
    nombre: string;
    fecha:  string;
    hora: string;
    descripcion?: string;
    presentador: string;
    
}
export class Conferencia implements IConferencia {
    constructor(
        public id: string | number = 0,
        public nombre: string = '',
        public fecha:string = '',
        public hora:string = '',
        public presentador: string = '',
        public descripcion: string = ''
    ) { }
}

