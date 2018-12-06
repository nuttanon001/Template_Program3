import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { BaseMasterComponent } from 'src/app/shared/baseclases/base-master-component';
import { Appointment } from '../shared/appointment.model';
import { AppointmentService } from '../shared/appointment.service';
import { AppointmentCommunicateService } from '../shared/appointment-communicate.service';
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';
import { AppointmentTableComponent } from '../appointment-table/appointment-table.component';

@Component({
  selector: 'app-appointment-master',
  templateUrl: './appointment-master.component.html',
  styleUrls: ['./appointment-master.component.scss'],
  providers: [ AppointmentCommunicateService ]
})
export class AppointmentMasterComponent
  extends BaseMasterComponent<Appointment, AppointmentService, AppointmentCommunicateService> {

  constructor(
    service: AppointmentService,
    serviceCom: AppointmentCommunicateService,
    serviceDialog: DialogsService,
    viewCon: ViewContainerRef,
  ) {
    super(service, serviceCom, serviceDialog, viewCon);
  }
  backToSchedule: boolean = false;
  @ViewChild(AppointmentTableComponent)
  private tableComponent: AppointmentTableComponent;

  onReloadData(): void {
    this.tableComponent.reloadData();
  }
}
