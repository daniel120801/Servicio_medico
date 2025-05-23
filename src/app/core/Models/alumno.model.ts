export interface IAlumnoGeneral {
    id: number;
    nombre: string;
    matricula:string,
    telefono:string,
    correo:string,
    CURP:string,
    edad:number,
    ciudad:string,
    domicilio:string


}
export interface IAlumnoMedical{
    NSS:string,
    Afiliacion:string,
    RH:string,
    Donador:string,
    Peso:string,
    Talla:string,
    Alergias:string,
    Enfermedades:string,
    Tratamientos:string,
    discapacidad:string,
    EnCasoDeAccidente:string,

}

export class Alumno implements IAlumnoGeneral, IAlumnoMedical {
    constructor(
        public id: number = 0,
        public nombre: string = '',
        public matricula:string = '',
        public telefono:string = '',
        public correo:string = '',
        public CURP:string = '',
        public ciudad:string = '',
        public domicilio:string = '',
        public edad:number = 0,
        public NSS:string = '',
        public Afiliacion:string = '',
        public RH:string = '',
        public Donador:string = '',
        public Peso:string = '',
        public Talla:string = '',
        public Alergias:string = '',
        public Enfermedades:string = '',
        public Tratamientos:string = '',
        public discapacidad:string = '',
        public EnCasoDeAccidente:string = ''
        
    ) { }
}
