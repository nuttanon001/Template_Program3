import { Injectable } from '@angular/core';
import { BaseCommunicateService } from 'src/app/shared/baseclases/base-communicate.service';
import { Appointment } from './appointment.model';

@Injectable()
export class AppointmentCommunicateService extends BaseCommunicateService<Appointment> {
  constructor() { super(); }
}
