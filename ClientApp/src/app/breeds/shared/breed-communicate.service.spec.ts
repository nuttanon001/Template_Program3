import { TestBed } from '@angular/core/testing';

import { BreedCommunicateService } from './breed-communicate.service';

describe('BreedCommunicateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreedCommunicateService = TestBed.get(BreedCommunicateService);
    expect(service).toBeTruthy();
  });
});
