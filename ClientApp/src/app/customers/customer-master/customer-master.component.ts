import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { BaseMasterComponent } from 'src/app/shared/baseclases/base-master-component';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';
import { CustomerCommunicateService } from '../shared/customer-communicate.service';
import { DialogsService } from 'src/app/dialogs/shared/dialogs.service';
import { CustomerTableComponent } from '../customer-table/customer-table.component';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.scss'],
  providers: [CustomerCommunicateService]
})
export class CustomerMasterComponent
  extends BaseMasterComponent<Customer, CustomerService, CustomerCommunicateService> {

  constructor(
    service: CustomerService,
    serviceCom: CustomerCommunicateService,
    serviceDialog: DialogsService,
    viewCon: ViewContainerRef,
  ) {
    super(service, serviceCom, serviceDialog, viewCon);
  }
  backToSchedule: boolean = false;
  @ViewChild(CustomerTableComponent)
  private tableComponent: CustomerTableComponent;

  onReloadData(): void {
    this.tableComponent.reloadData();
  }

  // on save complete
  onSaveComplete(): void {
    this.dialogsService.context("System message", "Save completed.", this.viewContainerRef)
      .subscribe(result => {
        this.ShowDetail = false;
        // this.displayValue = undefined;
        this.onDetailView({ data: this.displayValue, option: 1 });
      });
  }
}
