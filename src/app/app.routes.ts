import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ConferenciasComponent } from './conferencias/conferencias.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { FormConferModalComponent } from './form-confer-modal/form-confer-modal.component';
import { PerfilAlumnoComponent } from './perfil-alumno/perfil-alumno.component';

export const routes: Routes = [

    { path: '', component: MainComponent },
    { path: 'main', component: MainComponent },
    { path: 'alumnos', component: AlumnosComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'confer', component: ConferenciasComponent },
    { path: 'formConfer', component: FormConferModalComponent },
    { path: 'perfilAlumno', component: PerfilAlumnoComponent }

];