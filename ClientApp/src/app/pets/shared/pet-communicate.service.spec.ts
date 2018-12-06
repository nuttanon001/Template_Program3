import { TestBed } from '@angular/core/testing';

import { PetCommunicateService } from './pet-communicate.service';

describe('PetCommunicateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetCommunicateService = TestBed.get(PetCommunicateService);
    expect(service).toBeTruthy();
  });
});
