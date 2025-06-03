import { Conferencia } from "../../core/Models/conferencia.model";
import { Vacunas } from "../../core/Models/vacunas.model";

export interface IAlumnoHeaders {
    id: number;
    nombre: string;
    matricula: string,
    carrera: string;


}

export interface IAlumnoGeneral {
    id: number;
    nombre: string;
    matricula: string,
    telefono: string,
    correo: string,
    CURP: string,
    edad: number,
    carrera: string,
    ciudad: string,
    domicilio: string,
    conferenciasAsistidas: Conferencia[]

}
export interface IAlumnoMedical {
    NSS: string,
    afiliacion: string
    RH: string,
    donador: string,
    peso: string,
    talla: string,
    alergias: string,
    enfermedades: string,
    tratamientos: string,
    discapacidad: string,
    enCasoDeAccidente: string,
    vacunas?: Vacunas[],


}

export class Alumno implements IAlumnoGeneral, IAlumnoMedical, IAlumnoHeaders {

    public id: number = 0;
    public nombre: string = '';
    public matricula: string = '';
    public telefono: string = '';
    public correo: string = '';
    public carrera: string = '';
    public CURP: string = '';
    public ciudad: string = '';
    public domicilio: string = '';
    public edad: number = 0;
    public NSS: string = '';
    public afiliacion: string = '';
    public RH: string = '';
    public donador: string = '';
    public peso: string = '';
    public talla: string = '';
    public alergias: string = '';
    public enfermedades: string = '';
    public tratamientos: string = '';
    public discapacidad: string = '';
    public enCasoDeAccidente: string = '';
    public conferenciasAsistidas: Conferencia[] = [];
    public vacunas: Vacunas[] = [];

    constructor(params: {
        general?: Partial<IAlumnoGeneral>;
        medical?: Partial<IAlumnoMedical>;
        headers?: Partial<IAlumnoHeaders>;
    }) {
        if (params.general) Object.assign(this, params.general);
        if (params.medical) Object.assign(this, params.medical);
        if (params.headers) Object.assign(this, params.headers);
    }


}
