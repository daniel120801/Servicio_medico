

export interface IDocumento {
    name: string;
    id: number;
}

export class Documento implements IDocumento {

    constructor(
         public id: number = -1,
        public name: string = ''
       
    ) {

    }
}