import { Provider } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';

export const provideSharedFeature: Provider[] = [
    AlumnosService ];