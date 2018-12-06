import { TestBed } from '@angular/core/testing';

import { PetHaveDiagnoseCommunicateService } from './pet-have-diagnose-communicate.service';

describe('PetHaveDiagnoseCommunicateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetHaveDiagnoseCommunicateService = TestBed.get(PetHaveDiagnoseCommunicateService);
    expect(service).toBeTruthy();
  });
});
