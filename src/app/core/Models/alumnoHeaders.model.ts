export interface IAlumnoHEaders {
    id: string | number;
    nombre: string;
    matricula: string,
    carrera: string;


}

export class AlumnoHeaders implements IAlumnoHEaders {
    constructor(
        public id: string | number = 0,
        public nombre: string = '',
        public matricula: string = '',
        public carrera: string = ''

    ) { }
}
