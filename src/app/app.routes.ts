import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AlumnosComponent } from './Alumnos/alumnos-buscador/alumnos-buscador.component';
import { ConferenciasComponent } from './conferencias/conferencias.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { FormConferModalComponent } from './form-confer-modal/form-confer-modal.component';
import { PerfilAlumnoComponent } from './Alumnos/perfil-alumno/perfil-alumno.component';
import { ParentAlumnosComponent } from './Alumnos/parent-alumnos/parent-alumnos.component';

export const routes: Routes = [

    { path: '', component: MainComponent },
    { path: 'main', component: MainComponent },
    { path: 'alumnos', component: ParentAlumnosComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'confer', component: ConferenciasComponent },
    { path: 'formConfer', component: FormConferModalComponent },
    { path: 'perfilAlumno', component: PerfilAlumnoComponent }

];