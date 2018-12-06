import { Injectable } from '@angular/core';
import { BaseRestService } from 'src/app/shared/baseclases/base-rest.service';
import { Appointment } from './appointment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/shared/baseclases/http-error-handler.service';
import { OptionSchedule } from 'src/app/shared/basemode/option-schedule.model';
import { Observable } from 'rxjs';
import { Schedule } from './schedule.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseRestService<Appointment> {
  constructor(
    http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    super(
      http,
      "api/Appointment/",
      "AppointmentService",
      "AppointmentId",
      httpErrorHandler
    )
  }

  /** get all with scroll data */
  getScheduleWithhScroll(scroll: OptionSchedule, subAction: string = "GetSchedule/"): Observable<any | Array<Schedule>> {
    // console.log(this.baseUrl + subAction);

    return this.http.post<Array<Schedule>>(this.baseUrl + subAction, JSON.stringify(scroll), {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    }).pipe(catchError(this.handleError("Get models for scroll component", new Array<Schedule>())));
  }
}
