export interface IAlumnoHEaders {
    id: number;
    nombre: string;
    matricula: string,
    carrera: string;


}

export class AlumnoHeaders implements IAlumnoHEaders {
    constructor(
        public id:  number = 0,
        public nombre: string = '',
        public matricula: string = '',
        public carrera: string = ''

    ) { }
}
