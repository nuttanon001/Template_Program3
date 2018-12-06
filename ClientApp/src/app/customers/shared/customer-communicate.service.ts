import { Injectable } from '@angular/core';
import { CustomerModule } from '../customer.module';
import { BaseCommunicateService } from 'src/app/shared/baseclases/base-communicate.service';
import { Customer } from './customer.model';

@Injectable()
export class CustomerCommunicateService extends BaseCommunicateService<Customer> {
  constructor() { super(); }
}
