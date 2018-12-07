import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialogEntryComponent } from 'src/app/shared/baseclases/base-dialog-entry.component';
import { Customer } from 'src/app/customers/shared/customer.model';
import { CustomerService } from 'src/app/customers/shared/customer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogInfo } from 'src/app/shared/basemode/dialog-info.model';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss']
})
export class CustomerDialogComponent extends BaseDialogEntryComponent<Customer, CustomerService> {
  /** employee-dialog ctor */
  constructor(
    service: CustomerService,
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInfo<Customer>
  ) {
    super(
      service,
      dialogRef
    );
  }

  // on init
  onInit(): void {
    if (this.data) {
      this.fastSelectd = this.data.option;
    }
  }
}
