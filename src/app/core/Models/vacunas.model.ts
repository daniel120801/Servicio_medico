// src/app/conferencias/models/conferencia.model.ts

export interface IVacunas {
    id: string | number;
    nombre: string;
    fecha: string;
}


export class Vacunas implements IVacunas {
    constructor(
        public id: string | number = 0,
        public nombre: string = '',
        public fecha: string = ''        
    ) { }
}

