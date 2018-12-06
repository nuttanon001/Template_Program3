import { TestBed } from '@angular/core/testing';

import { MedicineCommunicateService } from './medicine-communicate.service';

describe('MedicineCommunicateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicineCommunicateService = TestBed.get(MedicineCommunicateService);
    expect(service).toBeTruthy();
  });
});
