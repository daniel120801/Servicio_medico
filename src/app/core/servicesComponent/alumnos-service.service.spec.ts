import { TestBed } from '@angular/core/testing';

import { AlumnosServiceService } from './alumnos-service.service';

describe('AlumnosServiceService', () => {
  let service: AlumnosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
