// src/app/conferencias/models/conferencia.model.ts

export interface IConferencia {
    id: string | number;
    nombre: string;
    fecha: Date | string;
    hora: string;
    descripcion?: string;
    Presentador: string;
}


export class Conferencia implements IConferencia {
    constructor(
        public id: string | number,
        public nombre: string,
        public fecha: Date,
        public hora: string,
        public descripcion: string = '',
        public Presentador: string
    ) { }

    // Método para formatear fecha legible
    getFechaFormateada(): string {
        return this.fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }


    save(): void {
        // Lógica para guardar la conferencia
        console.log('Conferencia guardada:', this);
    }
}

