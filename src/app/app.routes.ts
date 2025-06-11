import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ConferenciasComponent } from './conferencias/conferencias.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { FormConferModalComponent } from './form-confer-modal/form-confer-modal.component';
import { PerfilAlumnoComponent } from './Alumnos-root/perfil-alumno/perfil-alumno.component';
import { ParentAlumnosComponent } from './Alumnos-root/parent-alumnos/parent-alumnos.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'main', component: MainComponent },
    { path: 'alumnos', component: ParentAlumnosComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'confer', component: ConferenciasComponent },
    { path: 'formConfer', component: FormConferModalComponent },
    { path: 'perfilAlumno', component: PerfilAlumnoComponent }

];