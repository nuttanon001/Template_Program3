import { Injectable } from '@angular/core';
import { BreedModule } from '../breed.module';
import { BaseCommunicateService } from 'src/app/shared/baseclases/base-communicate.service';
import { Breed } from './breed.model';

@Injectable()
export class BreedCommunicateService extends BaseCommunicateService<Breed> {

  constructor() { super(); }
}
