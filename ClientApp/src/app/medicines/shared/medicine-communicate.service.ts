import { Injectable } from '@angular/core';
import { Medicine } from './medicine.model';
import { BaseCommunicateService } from 'src/app/shared/baseclases/base-communicate.service';

@Injectable()
export class MedicineCommunicateService extends BaseCommunicateService<Medicine> {
  constructor() { super(); }
}
