import { Injectable } from '@angular/core';
import { BaseRestService } from 'src/app/shared/baseclases/base-rest.service';
import { Diagnoses } from './diagnoses.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/shared/baseclases/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosesService extends BaseRestService<Diagnoses> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/Diagnoses/",
      "DiagnosesService",
      "DiagnosisId",
      httpErrorHandler
    )
  }
}
