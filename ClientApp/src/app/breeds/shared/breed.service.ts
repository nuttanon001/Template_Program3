import { Injectable } from '@angular/core';
import { BaseRestService } from 'src/app/shared/baseclases/base-rest.service';
import { Breed } from './breed.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/shared/baseclases/http-error-handler.service';

@Injectable({
  providedIn: "root"
})
export class BreedService extends BaseRestService<Breed> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/Breed/",
      "BreedService",
      "BreedId",
      httpErrorHandler
    )
  }
}
