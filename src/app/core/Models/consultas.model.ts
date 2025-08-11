// src/app/conferencias/models/conferencia.model.ts

export interface Consulta {
    id: string | number;
  nombre: string;
  fecha: string;
  diagnostico: string;
  nota:string;
  impresion:string;
}

export class Consultas implements Consulta {
  constructor(
    public id: string | number = 0,
    public nombre: string = '',
    public fecha: string = '',
    public diagnostico: string = '',
    public nota: string = '',
    public impresion: string = ''
  ) {}

  patchValue(consulta: Consulta): void {
    this.id = consulta.id;
    this.nombre = consulta.nombre;
    this.fecha = consulta.fecha;
    this.diagnostico = consulta.diagnostico;
    this.nota = consulta.nota;
    this.impresion = consulta.impresion;
  }
}

