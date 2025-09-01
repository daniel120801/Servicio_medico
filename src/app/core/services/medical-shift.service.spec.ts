import { TestBed } from '@angular/core/testing';

import { MedicalShiftService } from './medical-shift.service';

describe('MedicalShiftService', () => {
  let service: MedicalShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
