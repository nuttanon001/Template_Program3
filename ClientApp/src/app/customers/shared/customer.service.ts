// Angular Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Modules
import { CustomerModule } from '../customer.module';
// Services
import { BaseRestService } from 'src/app/shared/baseclases/base-rest.service';
import { HttpErrorHandler } from 'src/app/shared/baseclases/http-error-handler.service';
// Model
import { Customer } from './customer.model';

@Injectable({
  providedIn: "root"
})
export class CustomerService extends BaseRestService<Customer> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/Customer/",
      "CustomerService",
      "CustomerId",
      httpErrorHandler
    )
  }
}
