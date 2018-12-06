import { TestBed } from '@angular/core/testing';

import { DiagnosesService } from './diagnoses.service';

describe('DiagnosesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiagnosesService = TestBed.get(DiagnosesService);
    expect(service).toBeTruthy();
  });
});
