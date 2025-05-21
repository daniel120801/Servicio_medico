import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from '../core/Models/alumno.model';

@Component({
  selector: 'app-perfil-alumno',
  imports: [],
  templateUrl: './perfil-alumno.component.html',
  styleUrl: './perfil-alumno.component.css'
})
export class PerfilAlumnoComponent implements OnInit {
  alumno: Alumno | null = null;
  constructor(private router: Router) {
    console.log('ID recibido:', this.router.getCurrentNavigation()?.extras.state?.['id']);
  }
  
  ngOnInit(): void {


  }
}
