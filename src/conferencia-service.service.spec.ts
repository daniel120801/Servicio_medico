import { TestBed } from '@angular/core/testing';

import { ConferenciaServiceService } from './conferencia-service.service';

describe('ConferenciaServiceService', () => {
  let service: ConferenciaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConferenciaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
