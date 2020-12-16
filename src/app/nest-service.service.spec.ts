import { TestBed } from '@angular/core/testing';

import { NestService } from './nest-service.service';

describe('NestServiceService', () => {
  let service: NestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
