export interface IAlumno {
    id: string | number;
    nombre: string;
}

export class Alumno implements IAlumno {
    constructor(
        public id: string | number = 0,
        public nombre: string = ''
    ) { }
}
