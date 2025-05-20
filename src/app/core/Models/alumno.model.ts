export interface IAlumno {
    id: string | number;
    nombre: string;
    matricula:string,
    telefono:string,
    correo:string,
    CURP:string,
    ciudad:string,
    domicilio:string


}

export class Alumno implements IAlumno {
    constructor(
        public id: string | number = 0,
        public nombre: string = '',
        public matricula:string = '',
        public telefono:string = '',
        public correo:string = '',
        public CURP:string = '',
        public ciudad:string = '',
        public domicilio:string = ''
        
    ) { }
}
