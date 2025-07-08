// src/app/conferencias/models/conferencia.model.ts

export interface Consulta {
    id: string | number;
  nombre: string;
  fecha: string;
  diagnostico: string;
}

export class Consultas implements Consulta {
  constructor(
    public id: string | number = 0,
    public nombre: string = '',
    public fecha: string = '',
    public diagnostico: string = ''
  ) {}

  patchValue(consulta: Consulta): void {
    this.id = consulta.id;
    this.nombre = consulta.nombre;
    this.fecha = consulta.fecha;
    this.diagnostico = consulta.diagnostico;
  }
}

