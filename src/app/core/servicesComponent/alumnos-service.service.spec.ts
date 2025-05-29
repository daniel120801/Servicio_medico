import { TestBed } from '@angular/core/testing';

import { AlumnosService } from '../../Alumnos/services/alumnos.service.ts respaldo';

describe('AlumnosServiceService', () => {
  let service: AlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
