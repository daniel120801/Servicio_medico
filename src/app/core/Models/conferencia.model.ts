// src/app/conferencias/models/conferencia.model.ts

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
        public fecha: string = '',
        public hora: string = '',
        public descripcion: string = '',
        public presentador: string = ''
    ) { }
}

