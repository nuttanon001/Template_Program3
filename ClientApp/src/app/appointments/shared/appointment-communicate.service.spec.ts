import { TestBed } from '@angular/core/testing';

import { AppointmentCommunicateService } from './appointment-communicate.service';

describe('AppointmentCommunicateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppointmentCommunicateService = TestBed.get(AppointmentCommunicateService);
    expect(service).toBeTruthy();
  });
});
