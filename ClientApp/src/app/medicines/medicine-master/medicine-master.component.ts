import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { BaseMasterComponent } from 'src/app/shared/baseclases/base-master-component';
import { Medicine } from '../shared/medicine.model';
import { MedicineService } from '../shared/medicine.service';
import { MedicineCommunicateService } from '../shared/medicine-communicate.service';
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';
import { MedicineTableComponent } from '../medicine-table/medicine-table.component';

@Component({
  selector: 'app-medicine-master',
  templateUrl: './medicine-master.component.html',
  styleUrls: ['./medicine-master.component.scss'],
  providers: [ MedicineCommunicateService ]
})
export class MedicineMasterComponent
  extends BaseMasterComponent<Medicine, MedicineService, MedicineCommunicateService> {

  constructor(
    service: MedicineService,
    serviceCom: MedicineCommunicateService,
    serviceDialog: DialogsService,
    viewCon: ViewContainerRef,
  ) {
    super(service, serviceCom, serviceDialog, viewCon);
  }

  backToSchedule: boolean = false;
  @ViewChild(MedicineTableComponent)
  private tableComponent: MedicineTableComponent;

  onReloadData(): void {
    this.tableComponent.reloadData();
  }
}
