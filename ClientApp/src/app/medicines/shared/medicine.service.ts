import { Injectable } from '@angular/core';
import { BaseRestService } from 'src/app/shared/baseclases/base-rest.service';
import { Medicine } from './medicine.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/shared/baseclases/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineService extends BaseRestService<Medicine> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/Medicines/",
      "MedicinesService",
      "MedicineId",
      httpErrorHandler
    )
  }
}
