// Angular Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Modules
import { PetModule } from '../pet.module';
// Services
import { BaseRestService } from 'src/app/shared/baseclases/base-rest.service';
import { HttpErrorHandler } from 'src/app/shared/baseclases/http-error-handler.service';
// Model
import { Pet } from './pet.model';

@Injectable({
  providedIn: "root"
})
export class PetService extends BaseRestService<Pet> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/Pet/",
      "PetService",
      "PetId",
      httpErrorHandler
    )
  }
}
