import { Injectable } from '@angular/core';
import { PetModule } from '../pet.module';
import { BaseCommunicateService } from 'src/app/shared/baseclases/base-communicate.service';
import { Pet } from './pet.model';

@Injectable()

export class PetCommunicateService extends BaseCommunicateService<Pet> {
  constructor() { super(); }
}
