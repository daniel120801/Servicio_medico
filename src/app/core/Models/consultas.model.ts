// src/app/conferencias/models/conferencia.model.ts

export interface Consulta {
    id: string | number;
  nombre: string;
  fecha: string;
  diagnostico: string;
}

export class Vacunas implements Consulta {
     constructor(
    public id: number = 0,
    public nombre: string = '',
    public fecha: string = '',
    public diagnostico: string = ''
  ) {}
}

