import { Provider } from '@angular/core';
import { MedicalShiftService } from '../services/medical-shift.service';

export const provideSharedFeature: Provider[] = [
    MedicalShiftService  ];