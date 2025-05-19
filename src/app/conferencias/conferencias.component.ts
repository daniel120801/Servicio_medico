import { Component, OnInit, ViewChild } from '@angular/core';
import { Conferencia } from './Models/conferencia.model';
import { Router } from '@angular/router';
import { ConferenciaServiceService } from '../../conferencia-service.service';
import { FormConferModalComponent } from '../form-confer-modal/form-confer-modal.component';

@Component({
  selector: 'app-conferencias',
  imports: [],
  templateUrl: './conferencias.component.html',
  styleUrl: './conferencias.component.css',
  providers: [ConferenciaServiceService]
})
export class ConferenciasComponent implements OnInit {
  conferencias: Conferencia[] = [];

  @ViewChild(FormConferModalComponent) modal!: FormConferModalComponent;


  constructor(private router: Router, public conferenciaService: ConferenciaServiceService) { }

  ngOnInit(): void {
    if (this.conferenciaService == null) {
      console.log('Error: conferenciaService is null');
      return;
    }
    this.conferenciaService.getConferencias().subscribe((response: Conferencia[]) => {
      this.conferencias = response;
      console.log('Conferencias obtenidas:', this.conferencias);
    });
  }


  navigateToForm(): void {
    this.router.navigate(['/formConfer'])
  }


}
