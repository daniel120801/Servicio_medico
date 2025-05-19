import { Component, ViewChild } from '@angular/core';
import { Conferencia } from './Models/conferencia.model';

@Component({
  selector: 'app-conferencias',
  imports: [],
  templateUrl: './conferencias.component.html',
  styleUrl: './conferencias.component.css'
})
export class ConferenciasComponent {

  @ViewChild(FormConferModalComponent) modal!: FormConferModalComponent;



  createNewConfer(conferencia:Conferencia): void {
    
  }


}
