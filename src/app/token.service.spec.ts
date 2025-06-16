import { TestBed } from '@angular/core/testing';

import { AuthService } from './core/services/token.service';

describe('TokenService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
