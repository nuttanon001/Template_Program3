import { TestBed } from '@angular/core/testing';

import { CustomerCommunicateService } from './customer-communicate.service';

describe('CustomerCommunicateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerCommunicateService = TestBed.get(CustomerCommunicateService);
    expect(service).toBeTruthy();
  });
});
