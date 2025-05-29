import { Provider } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';
import { filterHeadersUtility } from '../Utilities/filterHeadersUtility';

export const provideSharedFeature: Provider[] = [
    AlumnosService  ];