import { TestBed } from '@angular/core/testing';

import { AlumnosService } from '../../Alumnos/alumnos.service';

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
