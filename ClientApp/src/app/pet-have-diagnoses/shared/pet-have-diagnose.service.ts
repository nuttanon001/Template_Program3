import { Injectable } from '@angular/core';
import { BaseRestService } from 'src/app/shared/baseclases/base-rest.service';
import { PetHaveDiagnose } from './pet-have-diagnose.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/shared/baseclases/http-error-handler.service';
import { Observable } from 'rxjs';
import { History } from './history.model';
import { catchError } from 'rxjs/operators';

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

  /** get all with scroll data */
  getHistoryDiagnose(history: History, subAction: string = "HistoryDiagnosis/"): Observable<any> {
    // console.log(this.baseUrl + subAction);
    return this.http.post<any>(this.baseUrl + subAction, JSON.stringify(history),
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        })
      }).pipe(catchError(this.handleError("Get models for scroll component", {})));
  }
}
