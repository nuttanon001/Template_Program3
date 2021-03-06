import { Injectable } from '@angular/core';
import { BaseRestService } from 'src/app/shared/baseclases/base-rest.service';
import { Treatments } from './treatments.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/shared/baseclases/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TreatmentsService extends BaseRestService<Treatments> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/Treatments/",
      "TreatmentsService",
      "TreatmentId",
      httpErrorHandler
    )
  }
}
