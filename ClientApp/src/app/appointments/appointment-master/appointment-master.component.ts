import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { BaseMasterComponent } from 'src/app/shared/baseclases/base-master-component';
import { Appointment } from '../shared/appointment.model';
import { AppointmentService } from '../shared/appointment.service';
import { AppointmentCommunicateService } from '../shared/appointment-communicate.service';
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';
import { AppointmentTableComponent } from '../appointment-table/appointment-table.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
    private location: Location,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    super.ngOnInit();

    this.route.paramMap.subscribe((param: ParamMap) => {
      let key: number = Number(param.get("key") || 0);
      if (key) {
        let value: { data: Appointment, option: number } = {
          data: {
            AppointmentId: 0,
            PetId: key,
          },
          option: 1
        }
        this.backToSchedule = true;
        this.onDetailView(value);
      }
    }, error => console.error(error));
  }

  // on save complete
  onSaveComplete(): void {
    this.dialogsService.context("System message", "Save completed.", this.viewContainerRef)
      .subscribe(result => {
        this.ShowDetail = false;
        this.displayValue = undefined;
        if (this.backToSchedule) {
          this.location.back();
        }
      });
  }
}
