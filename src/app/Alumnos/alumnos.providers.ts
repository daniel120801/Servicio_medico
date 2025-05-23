import { Provider } from '@angular/core';
import { AlumnosService } from './alumnos.service';

export const provideSharedFeature: Provider[] = [
    AlumnosService ];