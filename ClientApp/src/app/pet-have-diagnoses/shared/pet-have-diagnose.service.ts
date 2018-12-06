import { Injectable } from '@angular/core';
import { BaseRestService } from 'src/app/shared/baseclases/base-rest.service';
import { PetHaveDiagnose } from './pet-have-diagnose.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/shared/baseclases/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PetHaveDiagnoseService extends BaseRestService<PetHaveDiagnose> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/PetHaveDiagnosis/",
      "PetHaveDiagnosisService",
      "PetHaveDiagnosisId",
      httpErrorHandler
    )
  }
}
