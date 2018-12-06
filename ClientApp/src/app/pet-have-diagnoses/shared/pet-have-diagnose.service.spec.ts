import { TestBed } from '@angular/core/testing';

import { PetHaveDiagnoseService } from './pet-have-diagnose.service';

describe('PetHaveDiagnoseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetHaveDiagnoseService = TestBed.get(PetHaveDiagnoseService);
    expect(service).toBeTruthy();
  });
});
