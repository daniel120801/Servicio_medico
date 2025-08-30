import { formMedical } from "./formMedical.model";


export interface IMedicalShift {
    id: number;
    accessCode: string;
    name: string;
    fecha: Date;
    formMedicals: formMedical[];
    filesCount:number;
    state:boolean;

}


export class medicalShift implements IMedicalShift {

    constructor(
        public id: number = -1,
        public name: string = '',
        public accessCode: string = '',
        public fecha: Date = new Date(),
        public formMedicals: formMedical[] = [],
        public filesCount:number = 0,
        public state:boolean = false
    ) {

    }
}