
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
    //TODO: agregar los campos de conferencias asistidas 
    //TODO: Crear los modelos de conferencias
    conferenciasAsistidas?: string[]

}
export interface IAlumnoMedical {
    NSS: string,
    Afiliacion: string
    RH: string,
    Donador: string,
    Peso: string,
    Talla: string,
    Alergias: string,
    Enfermedades: string,
    Tratamientos: string,
    discapacidad: string,
    EnCasoDeAccidente: string,
    //TODO: agregar los campos de vacunas
    //TODO: Crear los modelos de vacunas
    vacunas?: string[],


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
  public Afiliacion: string = '';
  public RH: string = '';
  public Donador: string = '';
  public Peso: string = '';
  public Talla: string = '';
  public Alergias: string = '';
  public Enfermedades: string = '';
  public Tratamientos: string = '';
  public discapacidad: string = '';
  public EnCasoDeAccidente: string = '';

    constructor(params: {
        general?: Partial<IAlumnoGeneral>;
        medical?: Partial<IAlumnoMedical>;
        headers?: Partial<IAlumnoHeaders>;
    }) {
        if (params.general) Object.assign(this, params.general);
        if (params.medical) Object.assign(this, params.medical);
        if (params.headers) Object.assign(this, params.headers);
    }


    /**
     * getHeader
     */
    public getHeader(): IAlumnoHeaders {

        return this;
    }

}
