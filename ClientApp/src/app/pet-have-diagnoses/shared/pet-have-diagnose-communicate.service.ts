import { Injectable } from '@angular/core';
import { BaseCommunicateService } from 'src/app/shared/baseclases/base-communicate.service';
import { PetHaveDiagnose } from './pet-have-diagnose.model';

@Injectable()
export class PetHaveDiagnoseCommunicateService
  extends BaseCommunicateService<PetHaveDiagnose> {
  constructor() { super(); }
}
